import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as logService from '../../services/logService';

const LogCompleto = () => {
  const { user } = useAuth();
  
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Filtros
  const [filters, setFilters] = useState({
    estado: '',
    puesto: '',
    orden: '',
    referencia: ''
  });

  // Estado del Modal de Edición
  const [showModal, setShowModal] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [formData, setFormData] = useState({
    newCantidad: '',
    newEstado: ''
  });

  useEffect(() => {
    cargarLogs();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [logs, filters]);

  const cargarLogs = async () => {
    setLoading(true);
    try {
      const data = await logService.getLogs();
      setLogs(data);
    } catch (error) {
      showMessage('Error al cargar logs del servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let result = [...logs];

    if (filters.estado !== '') {
      result = result.filter(log => log.SAP_STATUS.toString() === filters.estado);
    }
    if (filters.puesto !== '') {
      result = result.filter(log => log.PRODUCTION_LINE?.toLowerCase().includes(filters.puesto.toLowerCase()));
    }
    if (filters.orden !== '') {
      result = result.filter(log => log.ORDER_NUMBER?.toLowerCase().includes(filters.orden.toLowerCase()));
    }
    if (filters.referencia !== '') {
      result = result.filter(log => log.REFERENCE?.toLowerCase().includes(filters.referencia.toLowerCase()));
    }

    setFilteredLogs(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 0: return <span style={{ background: '#6c757d', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>Pendiente</span>;
      case 1: return <span style={{ background: '#28a745', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>Completado</span>;
      case 2: return <span style={{ background: '#dc3545', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>Error</span>;
      case 3: return <span style={{ background: '#fd7e14', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>En revisión</span>;
      default: return <span>{status}</span>;
    }
  };

  // --- Lógica del Modal (Editar) ---
  const handleOpenEdit = (log) => {
    setEditingLog(log);
    setFormData({
      newCantidad: log.QUANTITY_MANUFACTURED,
      newEstado: log.SAP_STATUS
    });
    setShowModal(true);
  };

  const handleCloseEdit = () => {
    setShowModal(false);
    setEditingLog(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await logService.updateLog({
        originalDateTime: editingLog.DATE_TIME,
        orderId: editingLog.ORDER_ID,
        newCantidad: formData.newCantidad,
        newEstado: formData.newEstado
      });
      showMessage('Registro actualizado correctamente', 'success');
      handleCloseEdit();
      cargarLogs();
    } catch (error) {
      showMessage('Error al actualizar registro', 'error');
    }
  };

  // --- Lógica Eliminar ---
  const handleDelete = async (log) => {
    if (window.confirm(`¿Seguro que deseas eliminar el registro de la orden ${log.ORDER_NUMBER}?`)) {
      try {
        await logService.deleteLog({
          originalDateTime: log.DATE_TIME,
          orderId: log.ORDER_ID
        });
        showMessage('Registro eliminado correctamente', 'success');
        cargarLogs();
      } catch (error) {
        showMessage('Error al eliminar registro', 'error');
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Log de Ejecución</h2>

      {message.text && (
        <div style={{ padding: '10px', marginBottom: '20px', backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24', borderRadius: '4px' }}>
          {message.text}
        </div>
      )}

      {/* Controles de Filtro */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>Estado</label>
          <select name="estado" value={filters.estado} onChange={handleFilterChange} style={{ width: '100%', padding: '8px' }}>
            <option value="">Todos</option>
            <option value="0">Pendiente</option>
            <option value="1">Completado</option>
            <option value="2">Error</option>
            <option value="3">En revisión</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>Puesto</label>
          <input type="text" name="puesto" value={filters.puesto} onChange={handleFilterChange} placeholder="Filtrar..." style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>Orden</label>
          <input type="text" name="orden" value={filters.orden} onChange={handleFilterChange} placeholder="Filtrar..." style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>Referencia</label>
          <input type="text" name="referencia" value={filters.referencia} onChange={handleFilterChange} placeholder="Filtrar..." style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
      </div>

      {/* Tabla de Logs */}
      {loading ? (
        <p>Cargando registros...</p>
      ) : (
        <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#343a40', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Fecha</th>
                <th style={{ padding: '12px' }}>Puesto</th>
                <th style={{ padding: '12px' }}>Orden</th>
                <th style={{ padding: '12px' }}>Referencia</th>
                <th style={{ padding: '12px' }}>Cantidad</th>
                <th style={{ padding: '12px' }}>Estado</th>
                <th style={{ padding: '12px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '20px', textAlign: 'center' }}>No se encontraron registros.</td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{new Date(log.DATE_TIME).toLocaleString()}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{log.PRODUCTION_LINE}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{log.ORDER_NUMBER}</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{log.REFERENCE}</td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: 'bold' }}>{log.QUANTITY_MANUFACTURED}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(log.SAP_STATUS)}</td>
                    <td style={{ padding: '12px' }}>
                      <button 
                        onClick={() => handleOpenEdit(log)}
                        style={{ marginRight: '8px', padding: '4px 8px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(log)}
                        style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Edición */}
      {showModal && editingLog && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '400px' }}>
            <h3 style={{ marginTop: 0 }}>Editar Registro</h3>
            <p style={{ fontSize: '12px', color: '#6c757d', marginBottom: '15px' }}>Orden: {editingLog.ORDER_NUMBER}</p>
            
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cantidad Declarada:</label>
                <input 
                  type="number" 
                  name="newCantidad" 
                  value={formData.newCantidad} 
                  onChange={handleFormChange} 
                  min="1"
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estado del Registro:</label>
                <select 
                  name="newEstado" 
                  value={formData.newEstado} 
                  onChange={handleFormChange} 
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  required
                >
                  <option value="0">Pendiente (0)</option>
                  <option value="1">Completado (1)</option>
                  <option value="2">Error (2)</option>
                  <option value="3">En revisión (3)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button type="button" onClick={handleCloseEdit} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LogCompleto;
