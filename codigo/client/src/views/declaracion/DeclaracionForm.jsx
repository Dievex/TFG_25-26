import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as declaracionService from '../../services/declaracionService';

const DeclaracionForm = () => {
  const { user } = useAuth();
  
  // Estado de las opciones
  const [puestos, setPuestos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [referencias, setReferencias] = useState([]);
  const [historial, setHistorial] = useState([]);

  // Estado del formulario
  const [idPuesto, setIdPuesto] = useState('');
  const [idOrden, setIdOrden] = useState('');
  const [idReferencia, setIdReferencia] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [cantidadAnterior, setCantidadAnterior] = useState(0);

  // Estados de carga y mensajes
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    cargarPuestos();
    cargarHistorial();
  }, []);

  const cargarPuestos = async () => {
    try {
      const data = await declaracionService.getPuestos();
      setPuestos(data);
    } catch (error) {
      console.error('Error al cargar puestos', error);
    }
  };

  const cargarHistorial = async () => {
    try {
      const data = await declaracionService.getHistorial();
      setHistorial(data);
    } catch (error) {
      console.error('Error al cargar historial', error);
    }
  };

  const handlePuestoChange = async (e) => {
    const val = e.target.value;
    setIdPuesto(val);
    setIdOrden('');
    setIdReferencia('');
    setOrdenes([]);
    setReferencias([]);
    setCantidadAnterior(0);

    if (val) {
      try {
        const data = await declaracionService.getOrdenes(val);
        setOrdenes(data);
      } catch (error) {
        console.error('Error al cargar órdenes', error);
      }
    }
  };

  const handleOrdenChange = async (e) => {
    const val = e.target.value;
    setIdOrden(val);
    setIdReferencia('');
    setReferencias([]);
    
    if (val) {
      try {
        const [refData, cantAnterior] = await Promise.all([
          declaracionService.getReferencias(val),
          declaracionService.getCantidadAnterior(val)
        ]);
        setReferencias(refData);
        setCantidadAnterior(cantAnterior);
      } catch (error) {
        console.error('Error al cargar referencias o cantidad', error);
      }
    } else {
      setCantidadAnterior(0);
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!idPuesto || !idOrden || !idReferencia || !cantidad || cantidad <= 0) {
      setMessage({ text: 'Por favor completa todos los campos correctamente.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const puestoObj = puestos.find(p => p.id.toString() === idPuesto);
      const ordenObj = ordenes.find(o => o.id.toString() === idOrden);
      const refObj = referencias.find(r => r.id.toString() === idReferencia);

      await declaracionService.guardarDeclaracion({
        idPuesto: puestoObj.id,
        nombrePuesto: puestoObj.nombre,
        idOrden: ordenObj.id,
        numeroOrden: ordenObj.numero,
        idReferencia: refObj.id,
        numeroReferencia: refObj.numero,
        cantidad: parseInt(cantidad, 10)
      });

      setMessage({ text: 'Declaración guardada exitosamente.', type: 'success' });
      setCantidad('');
      cargarHistorial();
      
      // Actualizar cantidad anterior visualmente
      const cantAnterior = await declaracionService.getCantidadAnterior(idOrden);
      setCantidadAnterior(cantAnterior);
      
    } catch (error) {
      setMessage({ text: 'Error al guardar la declaración.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarSAP = async () => {
    setLoading(true);
    try {
      await declaracionService.enviarASap();
      setMessage({ text: '¡Señal enviada a SAP (Robot activado)!', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Error al activar el robot.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 0: return <span style={{ background: '#6c757d', color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '12px' }}>Pendiente</span>;
      case 1: return <span style={{ background: '#28a745', color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '12px' }}>Completado</span>;
      case 2: return <span style={{ background: '#dc3545', color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '12px' }}>Error</span>;
      case 3: return <span style={{ background: '#fd7e14', color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '12px' }}>En revisión</span>;
      default: return <span>Desconocido</span>;
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Declaración de Producción</h2>

      {message.text && (
        <div style={{ padding: '10px', marginBottom: '20px', backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24', borderRadius: '4px' }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Puesto:</label>
          <select value={idPuesto} onChange={handlePuestoChange} style={{ width: '100%', padding: '8px' }} required>
            <option value="">-- Seleccionar Puesto --</option>
            {puestos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Orden:</label>
          <select value={idOrden} onChange={handleOrdenChange} style={{ width: '100%', padding: '8px' }} disabled={!idPuesto} required>
            <option value="">-- Seleccionar Orden --</option>
            {ordenes.map(o => (
              <option key={o.id} value={o.id}>{o.numero}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Referencia:</label>
          <select value={idReferencia} onChange={(e) => setIdReferencia(e.target.value)} style={{ width: '100%', padding: '8px' }} disabled={!idOrden} required>
            <option value="">-- Seleccionar Referencia --</option>
            {referencias.map(r => (
              <option key={r.id} value={r.id}>{r.numero}</option>
            ))}
          </select>
        </div>

        {idOrden && (
          <div style={{ padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '14px' }}>
            <strong>Cantidad producida anteriormente en esta orden:</strong> {cantidadAnterior}
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cantidad a declarar:</label>
          <input 
            type="number" 
            value={cantidad} 
            onChange={(e) => setCantidad(e.target.value)} 
            min="1"
            disabled={!idReferencia}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="submit" 
            disabled={loading || !idReferencia || !cantidad}
            style={{ flex: 1, padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Guardar
          </button>
          
          <button 
            type="button" 
            onClick={handleEnviarSAP}
            disabled={loading || historial.filter(h => h.SAP_STATUS === 0).length === 0}
            style={{ flex: 1, padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Enviar a SAP
          </button>
        </div>
      </form>

      {/* Botón flotante para ver Log */}
      <button 
        onClick={() => setShowLog(!showLog)}
        style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '15px 20px', backgroundColor: '#343a40', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
      >
        {showLog ? 'Cerrar Log' : 'Ver Log Reciente'}
      </button>

      {/* Pop up del Log */}
      {showLog && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', width: '400px', maxHeight: '400px', overflowY: 'auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #dee2e6' }}>
          <div style={{ padding: '15px', borderBottom: '1px solid #dee2e6', backgroundColor: '#f8f9fa', borderRadius: '8px 8px 0 0', fontWeight: 'bold' }}>
            Últimos registros
          </div>
          <div style={{ padding: '10px' }}>
            {historial.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#6c757d' }}>No hay registros recientes.</p>
            ) : (
              historial.map((item, index) => (
                <div key={index} style={{ padding: '10px', borderBottom: '1px solid #eee', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <strong>{item.ORDER_NUMBER}</strong>
                    {getStatusBadge(item.SAP_STATUS)}
                  </div>
                  <div style={{ color: '#495057' }}>Ref: {item.REFERENCE} | Cant: {item.QUANTITY_MANUFACTURED}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default DeclaracionForm;
