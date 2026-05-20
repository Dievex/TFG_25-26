import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as usuarioService from '../../services/usuarioService';

const GestionUsuarios = () => {
  const { user, logout } = useAuth();
  
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
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
      showMessage('Error al cargar datos del servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
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
      showMessage('Por favor completa los campos obligatorios', 'error');
      return;
    }

    try {
      if (editingId) {
        await usuarioService.updateUsuario(editingId, formData);
        showMessage('Usuario actualizado correctamente', 'success');
      } else {
        await usuarioService.createUsuario(formData);
        showMessage('Usuario creado correctamente', 'success');
      }
      handleCloseModal();
      cargarDatos();
    } catch (error) {
      showMessage(error.response?.data?.error || 'Error al procesar la solicitud', 'error');
    }
  };

  const handleDelete = async (id, mail) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${mail}?`)) {
      try {
        await usuarioService.deleteUsuario(id);
        showMessage('Usuario eliminado correctamente', 'success');
        cargarDatos();
      } catch (error) {
        showMessage('Error al eliminar usuario', 'error');
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Gestión de Usuarios</h2>

      {message.text && (
        <div style={{ padding: '10px', marginBottom: '20px', backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24', borderRadius: '4px' }}>
          {message.text}
        </div>
      )}

      <div style={{ marginBottom: '15px' }}>
        <button 
          onClick={() => handleOpenModal()} 
          style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Nuevo Usuario
        </button>
      </div>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#343a40', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Correo</th>
              <th style={{ padding: '12px' }}>Rol</th>
              <th style={{ padding: '12px' }}>Estado</th>
              <th style={{ padding: '12px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '12px', textAlign: 'center' }}>No hay usuarios registrados</td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '12px' }}>{u.id}</td>
                  <td style={{ padding: '12px' }}>{u.mail}</td>
                  <td style={{ padding: '12px' }}>{u.rol_nombre}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px', 
                      color: 'white',
                      backgroundColor: u.estado ? '#28a745' : '#dc3545' 
                    }}>
                      {u.estado ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => handleOpenModal(u)}
                      style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(u.id, u.mail)}
                      style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Modal Formulario */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '400px' }}>
            <h3>{editingId ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Correo Electrónico:</label>
                <input 
                  type="email" 
                  name="mail" 
                  value={formData.mail} 
                  onChange={handleFormChange} 
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Contraseña {editingId && <span style={{ fontSize: '12px', color: '#6c757d' }}>(Dejar en blanco para mantener la actual)</span>}:
                </label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleFormChange} 
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  required={!editingId}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Rol:</label>
                <select 
                  name="idrol" 
                  value={formData.idrol} 
                  onChange={handleFormChange} 
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                  required
                >
                  <option value="">-- Seleccionar Rol --</option>
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.nombre}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="checkbox" 
                  name="estado" 
                  id="estado"
                  checked={formData.estado} 
                  onChange={handleFormChange} 
                />
                <label htmlFor="estado">Usuario Activo</label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button type="button" onClick={handleCloseModal} style={{ flex: 1, padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Guardar
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
