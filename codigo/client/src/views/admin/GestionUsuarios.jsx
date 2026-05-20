import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as usuarioService from '../../services/usuarioService';
import { 
  Users, 
  Plus, 
  ChevronDown, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const GestionUsuarios = () => {
  const { user, logout } = useAuth();
  
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Estado del Modal
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    idrol: '',
    estado: true
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [usuariosData, rolesData] = await Promise.all([
        usuarioService.getUsuarios(),
        usuarioService.getRoles()
      ]);
      setUsuarios(usuariosData);
      setRoles(rolesData);
    } catch (error) {
      triggerNotification('Error al cargar datos del servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenModal = (usuario = null) => {
    if (usuario) {
      setEditingId(usuario.id);
      setFormData({
        mail: usuario.mail,
        password: '', // No mostramos la contraseña actual
        idrol: usuario.idrol,
        estado: usuario.estado
      });
    } else {
      setEditingId(null);
      setFormData({
        mail: '',
        password: '',
        idrol: '',
        estado: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mail || !formData.idrol || (!editingId && !formData.password)) {
      triggerNotification('Por favor completa los campos obligatorios', 'error');
      return;
    }

    try {
      if (editingId) {
        await usuarioService.updateUsuario(editingId, formData);
        triggerNotification('Usuario actualizado correctamente', 'success');
      } else {
        await usuarioService.createUsuario(formData);
        triggerNotification('Usuario creado correctamente', 'success');
      }
      handleCloseModal();
      cargarDatos();
    } catch (error) {
      triggerNotification(error.response?.data?.error || 'Error al procesar la solicitud', 'error');
    }
  };

  const handleDelete = async (id, mail) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${mail}?`)) {
      try {
        await usuarioService.deleteUsuario(id);
        triggerNotification('Usuario eliminado correctamente', 'success');
        cargarDatos();
      } catch (error) {
        triggerNotification('Error al eliminar usuario', 'error');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pt-6 pb-12">
      
      {/* Sistema de Notificaciones Toast */}
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

      {/* Header de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Gestión de Usuarios</h2>
          <p className="text-slate-500 text-sm mt-1">Administra las cuentas de usuario de Maflow, sus perfiles asignados y estados de acceso.</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center space-x-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all duration-150 text-sm active:scale-95 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* TABLA DE USUARIOS */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-medium">Cargando usuarios...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-200 text-[11px] font-bold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Usuario / Correo</th>
                  <th className="py-4 px-6">Rol de Acceso</th>
                  <th className="py-4 px-6 text-center">Estado</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-slate-400 font-medium">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition-all duration-150">
                      
                      {/* ID */}
                      <td className="py-4 px-6 whitespace-nowrap text-slate-400 font-mono text-xs">
                        #{u.id}
                      </td>

                      {/* Usuario / Correo */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm uppercase">
                            {u.mail.substring(0, 2)}
                          </div>
                          <span className="text-slate-900 font-bold">{u.mail}</span>
                        </div>
                      </td>

                      {/* Rol */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                          u.rol_nombre === 'SUPERADMIN' 
                            ? 'bg-purple-50 text-purple-700 border border-purple-100'
                            : u.rol_nombre === 'Administrador'
                            ? 'bg-blue-50 text-blue-700 border border-blue-100'
                            : u.rol_nombre === 'RESPONSABLE'
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {u.rol_nombre}
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="py-4 px-6 whitespace-nowrap text-center">
                        {u.estado ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                            Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                            Inactivo
                          </span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="py-4 px-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenModal(u)}
                            className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/50 rounded-lg text-xs font-bold transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(u.id, u.mail)}
                            className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/50 rounded-lg text-xs font-bold transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL PARA AGREGAR/EDITAR USUARIO */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all duration-300">
            
            {/* Header del modal */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {editingId ? <Edit2 className="w-5 h-5 text-amber-400" /> : <Users className="w-5 h-5 text-emerald-400" />}
                <span className="font-extrabold text-sm uppercase tracking-wider">
                  {editingId ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                </span>
              </div>
              <button 
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-white font-bold text-lg"
              >
                ×
              </button>
            </div>

            {/* Formulario del Modal */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="mail"
                  required
                  placeholder="ejemplo@maflow.com"
                  value={formData.mail}
                  onChange={handleFormChange}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Contraseña {editingId && <span className="text-slate-400 normal-case font-normal">(Dejar en blanco para mantener la actual)</span>}
                </label>
                <input
                  type="password"
                  name="password"
                  required={!editingId}
                  value={formData.password}
                  onChange={handleFormChange}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Rol del Usuario
                </label>
                <div className="relative">
                  <select
                    name="idrol"
                    required
                    value={formData.idrol}
                    onChange={handleFormChange}
                    className="block w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition appearance-none font-medium"
                  >
                    <option value="">-- Seleccionar Rol --</option>
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>{r.nombre}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input 
                  type="checkbox" 
                  name="estado" 
                  id="estado"
                  checked={formData.estado} 
                  onChange={handleFormChange}
                  className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="estado" className="text-sm font-bold text-slate-700 cursor-pointer">
                  Usuario Activo
                </label>
              </div>

              {/* Botones de acción del Modal */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs uppercase tracking-wider transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-xs uppercase tracking-wider transition shadow-md shadow-emerald-600/15"
                >
                  {editingId ? 'Guardar Cambios' : 'Crear Cuenta'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default GestionUsuarios;
