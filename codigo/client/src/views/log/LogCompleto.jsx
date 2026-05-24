import React, { useState, useEffect } from 'react';
import * as logService from '../../services/logService';
import { 
  Filter, 
  Search, 
  ChevronDown, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Download
} from 'lucide-react';

const LogCompleto = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [filters, setFilters] = useState({
    estado: 'Todos',
    puesto: '',
    orden: '',
    referencia: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [formData, setFormData] = useState({
    newCantidad: '',
    newEstado: ''
  });

  const cargarLogs = async () => {
    setLoading(true);
    try {
      const data = await logService.getLogs();
      setLogs(data);
    } catch {
      triggerNotification('Error al cargar logs del servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let result = [...logs];

    if (filters.estado !== 'Todos') {
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
    setCurrentPage(1);
  };

  useEffect(() => {
    cargarLogs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    aplicarFiltros();
  }, [logs, filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 0: 
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-4 tracking-wide bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20">
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-slate-500 dark:bg-slate-400"></span>Pendiente
          </span>
        );
      case 1: 
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-4 tracking-wide bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-emerald-500 dark:bg-emerald-400"></span>Completado
          </span>
        );
      case 2: 
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-4 tracking-wide bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-red-500 dark:bg-red-400"></span>Error
          </span>
        );
      case 3: 
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-4 tracking-wide bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-amber-500 dark:bg-amber-400 animate-pulse"></span>En revisión
          </span>
        );
      default: 
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-4 tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {status}
          </span>
        );
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);

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
      triggerNotification('Registro actualizado correctamente', 'success');
      handleCloseEdit();
      cargarLogs();
    } catch {
      triggerNotification('Error al actualizar registro', 'error');
    }
  };

  const handleDelete = async (log) => {
    if (window.confirm(`¿Seguro que deseas eliminar el registro de la orden ${log.ORDER_NUMBER}?`)) {
      try {
        await logService.deleteLog({
          originalDateTime: log.DATE_TIME,
          orderId: log.ORDER_ID
        });
        triggerNotification('Registro eliminado correctamente', 'success');
        cargarLogs();
      } catch {
        triggerNotification('Error al eliminar registro', 'error');
      }
    }
  };

  const handleExportar = async () => {
    try {
      const blob = await logService.exportarCSV(filters);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'logs_export.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      triggerNotification('Logs exportados correctamente', 'success');
    } catch {
      triggerNotification('Error al exportar logs', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pt-6 pb-12">
      
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center p-4 mb-4 text-sm rounded-xl shadow-xl border animate-slide-in-right bg-white max-w-md transition-all duration-300"
          style={{
            borderColor: notification.type === 'error' ? '#fee2e2' : '#dcfce7',
          }}
        >
          {notification.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 shrink-0" />
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Log de Ejecución</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Monitorea las declaraciones enviadas, sus estados de procesamiento por el robot RPA.</p>
        </div>
        
        <div className="flex items-center space-x-3 text-xs font-bold">
          <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-full flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>{logs.filter(l => l.SAP_STATUS === 1).length} Completados</span>
          </span>
          <span className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 rounded-full flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            <span>{logs.filter(l => l.SAP_STATUS === 3).length} En revisión</span>
          </span>
          <span className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-full flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            <span>{logs.filter(l => l.SAP_STATUS === 2).length} Errores</span>
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-sm space-y-4 transition-colors duration-300">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
            <Filter className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span>Filtros de Búsqueda Avanzada</span>
          </div>
          <button
            onClick={handleExportar}
            className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Estado</label>
            <div className="relative">
              <select
                name="estado"
                value={filters.estado}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                <option value="Todos">Todos los estados</option>
                <option value="0">Pendiente</option>
                <option value="1">Completado</option>
                <option value="2">Error</option>
                <option value="3">En revisión</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Puesto</label>
            <div className="relative">
              <input
                type="text"
                name="puesto"
                placeholder="Filtrar puesto..."
                value={filters.puesto}
                onChange={handleFilterChange}
                className="block w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white dark:placeholder-slate-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Orden</label>
            <div className="relative">
              <input
                type="text"
                name="orden"
                placeholder="Filtrar orden..."
                value={filters.orden}
                onChange={handleFilterChange}
                className="block w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white dark:placeholder-slate-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Referencia</label>
            <div className="relative">
              <input
                type="text"
                name="referencia"
                placeholder="Filtrar referencia..."
                value={filters.referencia}
                onChange={handleFilterChange}
                className="block w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white dark:placeholder-slate-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700 overflow-hidden transition-colors duration-300">
        {loading ? (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400 font-medium">Cargando registros...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-200 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800 dark:border-slate-700">
                  <th className="py-4 px-6">Fecha</th>
                  <th className="py-4 px-6">Puesto</th>
                  <th className="py-4 px-6">Orden</th>
                  <th className="py-4 px-6">Referencia</th>
                  <th className="py-4 px-6 text-center">Cantidad</th>
                  <th className="py-4 px-6 text-center">Estado</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm font-medium">
                {currentLogs.length > 0 ? (
                  currentLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-slate-50/70 dark:hover:bg-slate-700/50 transition-all duration-150">
                      
                      <td className="py-3.5 px-6 whitespace-nowrap text-slate-500 dark:text-slate-400 text-xs">
                        {new Date(log.DATE_TIME).toLocaleString('es-ES')}
                      </td>

                      <td className="py-3.5 px-6 whitespace-nowrap">
                        <span className="text-slate-900 dark:text-slate-200 font-semibold">{log.PRODUCTION_LINE || '—'}</span>
                      </td>

                      <td className="py-3.5 px-6 whitespace-nowrap text-slate-600 dark:text-slate-300 font-mono text-xs">
                        {log.ORDER_NUMBER}
                      </td>

                      <td className="py-3.5 px-6 whitespace-nowrap text-slate-600 dark:text-slate-300 font-mono text-xs">
                        {log.REFERENCE}
                      </td>

                      <td className="py-3.5 px-6 whitespace-nowrap text-center text-slate-900 dark:text-slate-100 font-bold">
                        {log.QUANTITY_MANUFACTURED}
                      </td>

                      <td className="py-3.5 px-6 whitespace-nowrap text-center">
                        {getStatusBadge(log.SAP_STATUS)}
                      </td>

                      <td className="py-3.5 px-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => handleOpenEdit(log)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(log)}
                            className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-slate-400 font-medium">
                      No se encontraron registros que coincidan con los filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {!loading && filteredLogs.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
            <div>
              Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredLogs.length)} de {filteredLogs.length} registros (Total: {logs.length})
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && editingLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all duration-300">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Edit2 className="w-5 h-5 text-amber-400" />
                <span className="font-extrabold text-sm uppercase tracking-wider">Editar Registro</span>
              </div>
              <button 
                onClick={handleCloseEdit}
                className="text-slate-400 hover:text-white font-bold text-lg"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                Orden: <strong className="text-slate-800 dark:text-slate-200 font-mono">{editingLog.ORDER_NUMBER}</strong>
              </p>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Cantidad Declarada
                </label>
                <input
                  type="number"
                  name="newCantidad"
                  required
                  min="1"
                  value={formData.newCantidad}
                  onChange={handleFormChange}
                  className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Estado del Registro
                </label>
                <div className="relative">
                  <select
                    name="newEstado"
                    value={formData.newEstado}
                    onChange={handleFormChange}
                    className="block w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition appearance-none font-medium dark:text-white"
                  >
                    <option value="0">Pendiente (0)</option>
                    <option value="1">Completado (1)</option>
                    <option value="2">Error (2)</option>
                    <option value="3">En revisión (3)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-lg text-xs uppercase tracking-wider transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg text-xs uppercase tracking-wider transition shadow-md shadow-blue-600/15"
                >
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
