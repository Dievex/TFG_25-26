import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const r = user.rol ? user.rol.toLowerCase() : '';
  const isResponsableOrAdmin = r === 'responsable' || r === 'administrador';
  const isAdmin = r === 'administrador';

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#fff' : '#adb5bd',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '5px 10px',
    borderRadius: '4px',
    backgroundColor: isActive ? '#495057' : 'transparent'
  });

  return (
    <nav style={{ 
      backgroundColor: '#343a40', 
      padding: '15px 20px', 
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: '#fff' }}>Maflow RPA</h2>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <NavLink to="/declaracion" style={linkStyle}>
            Declaración
          </NavLink>
          
          {isResponsableOrAdmin && (
            <NavLink to="/log" style={linkStyle}>
              Log de Registros
            </NavLink>
          )}
          
          {isAdmin && (
            <NavLink to="/admin" style={linkStyle}>
              Gestión Usuarios
            </NavLink>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '14px', color: '#e9ecef' }}>
          {user.mail} <strong style={{ color: '#fff' }}>({user.rol})</strong>
        </span>
        <button 
          onClick={logout} 
          style={{ 
            padding: '6px 12px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
