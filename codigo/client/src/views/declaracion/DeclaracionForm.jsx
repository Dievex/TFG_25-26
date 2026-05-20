import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as declaracionService from '../../services/declaracionService';
import { 
  Building, 
  Hash, 
  Sliders, 
  Activity, 
  Database, 
  CheckCircle2, 
  Clock, 
  Save, 
  Send, 
  ShieldAlert,
  ChevronDown,
  ListTodo
} from 'lucide-react';

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

  // Control del flujo secuencial de guardado
  const [isSaved, setIsSaved] = useState(false);
  const [showLog, setShowLog] = useState(false);

  // Estados de carga y mensajes
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    cargarPuestos();
    cargarHistorial();
  }, []);

  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

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
    setIsSaved(false);

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
    setIsSaved(false);
    
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
      triggerNotification('Por favor completa todos los campos correctamente.', 'error');
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

      triggerNotification('Declaración guardada exitosamente. ¡Paso 1 completado!', 'success');
      setIsSaved(true);
      cargarHistorial();
      
      const cantAnterior = await declaracionService.getCantidadAnterior(idOrden);
      setCantidadAnterior(cantAnterior);
      
    } catch (error) {
      triggerNotification('Error al guardar la declaración.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarSAP = async () => {
    setLoading(true);
    try {
      await declaracionService.enviarASap();
      triggerNotification('¡Señal enviada a SAP (Robot activado)!', 'success');
      
      // Limpiar formulario y resetear estado
      setIdPuesto('');
      setIdOrden('');
      setIdReferencia('');
      setCantidad('');
      setCantidadAnterior(0);
      setOrdenes([]);
      setReferencias([]);
      setIsSaved(false);
      cargarHistorial();
    } catch (error) {
      triggerNotification('Error al activar el robot.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Verifica si hay algo pendiente de enviar a SAP en el historial
  const hayPendientes = historial.some(h => h.SAP_STATUS === 0);

  const getStatusBadge = (status) => {
    switch(status) {
      case 0: return <span className="bg-slate-500/10 text-slate-700 border border-slate-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">Pendiente</span>;
      case 1: return <span className="bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">Completado</span>;
      case 2: return <span className="bg-red-500/10 text-red-700 border border-red-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">Error</span>;
      case 3: return <span className="bg-amber-500/10 text-amber-700 border border-amber-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">En revisión</span>;
      default: return <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[10px] font-bold">Desconocido</span>;
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-12 pt-6 relative">
      
      {/* Sistema de Notificaciones Toast */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center p-4 mb-4 text-sm rounded-xl shadow-xl border animate-slide-in-right bg-white max-w-md transition-all duration-300"
          style={{
            borderColor: notification.type === 'error' ? '#fee2e2' : '#dcfce7',
          }}
        >
          {notification.type === 'error' ? (
            <ShieldAlert className="w-5 h-5 text-red-500 mr-3 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
          )}
          <div>
            <span className="font-semibold text-slate-800">
              {notification.type === 'error' ? 'Error: ' : 'Éxito: '}
            </span>
            <span className="text-slate-600 ml-1">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Banner de Bienvenida */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 pointer-events-none">
          <Database className="w-80 h-80" />
        </div>
        <div className="relative z-10">
          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest inline-block mb-3">
            Estación de Trabajo Activa
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Declaración de Producción</h2>
          <p className="text-blue-100 mt-2 text-sm sm:text-base max-w-xl">
            Introduce los datos de planta. Recuerda que para asegurar la trazabilidad del sistema, <strong>debes seguir el flujo obligatorio de dos pasos</strong> detallado abajo.
          </p>
        </div>
      </div>

      {/* Formulario Principal de Declaración */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
        <form onSubmit={handleGuardar} className="space-y-6">
          
          {/* Campo: Puesto */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              <Building className="w-4 h-4 text-blue-500" />
              <span>Puesto / Estación de Trabajo</span>
            </label>
            <div className="relative">
              <select
                required
                value={idPuesto}
                onChange={handlePuestoChange}
                className="block w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all duration-150 appearance-none font-medium"
              >
                <option value="">-- Seleccionar Puesto --</option>
                {puestos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Dos Columnas: Orden y Referencia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Campo: Orden */}
            <div>
              <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                <Hash className="w-4 h-4 text-blue-500" />
                <span>Orden de Fabricación</span>
              </label>
              <div className="relative">
                <select
                  required
                  disabled={!idPuesto}
                  value={idOrden}
                  onChange={handleOrdenChange}
                  className="block w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all duration-150 appearance-none font-medium disabled:opacity-50"
                >
                  <option value="">-- Seleccionar Orden --</option>
                  {ordenes.map(o => (
                    <option key={o.id} value={o.id}>{o.numero}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Campo: Referencia */}
            <div>
              <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                <Sliders className="w-4 h-4 text-blue-500" />
                <span>Referencia de Material</span>
              </label>
              <div className="relative">
                <select
                  required
                  disabled={!idOrden}
                  value={idReferencia}
                  onChange={(e) => { setIdReferencia(e.target.value); setIsSaved(false); }}
                  className="block w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all duration-150 appearance-none font-medium disabled:opacity-50"
                >
                  <option value="">-- Seleccionar Referencia --</option>
                  {referencias.map(r => (
                    <option key={r.id} value={r.id}>{r.numero}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

          {idOrden && (
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-slate-100 p-3 rounded-xl border border-slate-200 transition-all duration-200">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Cantidad producida anteriormente en esta orden: <strong className="text-blue-600 text-sm ml-1">{cantidadAnterior}</strong></span>
            </div>
          )}

          {/* Campo: Cantidad a declarar */}
          <div>
            <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              <Activity className="w-4 h-4 text-blue-500" />
              <span>Cantidad a declarar (Unidades)</span>
            </label>
            <input
              type="number"
              required
              min="1"
              disabled={!idReferencia}
              placeholder="Ingresa la cantidad exacta"
              value={cantidad}
              onChange={(e) => { setCantidad(e.target.value); setIsSaved(false); }}
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all duration-150 font-medium disabled:opacity-50"
            />
          </div>

          {/* GUÍA DE FLUJO INTERACTIVO (STEPPER) */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60 mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                Flujo Obligatorio de Declaración:
              </span>
              {isSaved ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Declaración Lista
                </span>
              ) : (
                <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md flex items-center animate-pulse">
                  <Clock className="w-3.5 h-3.5 mr-1 text-blue-600" /> Pendiente Guardar
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Indicador Paso 1 */}
              <div className={`p-3 rounded-xl border flex items-start space-x-3 transition-all duration-200 ${
                isSaved 
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                  : 'bg-blue-50/50 border-blue-100 text-blue-900'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 text-[10px] ${
                  isSaved ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {isSaved ? '✓' : '1'}
                </div>
                <div>
                  <p className="font-extrabold">PASO 1: Guardar Declaración</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Valida los datos localmente.</p>
                </div>
              </div>

              {/* Indicador Paso 2 */}
              <div className={`p-3 rounded-xl border flex items-start space-x-3 transition-all duration-200 ${
                isSaved || hayPendientes
                  ? 'bg-blue-50/50 border-blue-100 text-blue-900' 
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0 text-[10px] ${
                  isSaved || hayPendientes ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-500'
                }`}>
                  2
                </div>
                <div>
                  <p className="font-extrabold">PASO 2: Enviar a SAP</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">El RPA procesará la entrada en SAP.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción Secuenciales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            
            {/* BOTÓN PASO 1 */}
            <div className="relative group">
              <span className="absolute -top-3 left-4 px-2 py-0.5 bg-white text-[10px] font-extrabold text-blue-600 tracking-wider rounded border border-blue-200 shadow-sm z-10">
                PASO 1: GUARDADO
              </span>
              <button
                type="submit"
                disabled={loading || !idReferencia || !cantidad}
                className={`w-full flex items-center justify-center space-x-2 py-3.5 px-6 font-bold rounded-xl border transition-all duration-200 active:scale-95 ${
                  isSaved 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700 shadow-md shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>✓ Declaración Guardada</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Guardar Declaración</span>
                  </>
                )}
              </button>
            </div>

            {/* BOTÓN PASO 2 */}
            <div className="relative">
              <span className={`absolute -top-3 left-4 px-2 py-0.5 bg-white text-[10px] font-extrabold tracking-wider rounded border shadow-sm z-10 transition-colors duration-200 ${
                (isSaved || hayPendientes)
                  ? 'text-emerald-600 border-emerald-200' 
                  : 'text-slate-400 border-slate-200'
              }`}>
                PASO 2: TRANSMISIÓN
              </span>
              
              <button
                type="button"
                onClick={handleEnviarSAP}
                disabled={loading || (!isSaved && !hayPendientes)}
                className={`w-full flex items-center justify-center space-x-2 py-3.5 px-6 font-extrabold rounded-xl transition-all duration-200 ${
                  (isSaved || hayPendientes)
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 active:scale-95 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-80'
                }`}
              >
                {(isSaved || hayPendientes) ? (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar a SAP Ahora</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-slate-400" />
                    <span>Bloqueado (Complete Paso 1)</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Mensaje de Ayuda dinámico para operarios */}
          {(!isSaved && !hayPendientes) && (
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200/60 transition-all duration-200">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Toma de Seguridad: Pulse el botón azul "Guardar Declaración" para desbloquear el envío a SAP.</span>
            </div>
          )}

        </form>
      </div>

      {/* Botón flotante para ver Log */}
      <button 
        onClick={() => setShowLog(!showLog)}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-full shadow-lg shadow-slate-900/20 transition-all duration-200 active:scale-95"
      >
        <ListTodo className="w-5 h-5 text-blue-400" />
        <span className="text-sm font-bold">{showLog ? 'Ocultar Registros' : 'Ver Log Reciente'}</span>
      </button>

      {/* Pop up del Log */}
      {showLog && (
        <div className="fixed bottom-20 right-6 z-40 w-80 max-h-96 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 animate-slide-in-right">
          <div className="sticky top-0 bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-sm font-extrabold text-slate-800">Últimos Registros</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-md">{historial.length} totales</span>
          </div>
          <div className="p-2">
            {historial.length === 0 ? (
              <p className="text-center py-6 text-sm text-slate-400 font-medium">No hay registros recientes.</p>
            ) : (
              <div className="space-y-1">
                {historial.map((item, index) => (
                  <div key={index} className="p-3 rounded-xl hover:bg-slate-50 transition-colors duration-150 border border-transparent hover:border-slate-100">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-mono font-bold text-slate-700">{item.ORDER_NUMBER}</span>
                      {getStatusBadge(item.SAP_STATUS)}
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-medium text-slate-500">
                      <span>Ref: {item.REFERENCE}</span>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Cant: {item.QUANTITY_MANUFACTURED}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default DeclaracionForm;
