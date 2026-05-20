import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, loginOperarioDirecto } = useAuth();
  const navigate = useNavigate();

  const handleRedirect = (rol) => {
    const r = rol ? rol.toLowerCase() : '';
    if (r === 'operario') navigate('/declaracion');
    else if (r === 'responsable') navigate('/log');
    else if (r === 'administrador') navigate('/admin');
    else setError(`Rol no reconocido: ${rol}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const usuario = await login(username, password);
      handleRedirect(usuario.rol);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOperarioRapido = async () => {
    setError(null);
    try {
      const usuario = await loginOperarioDirecto();
      handleRedirect(usuario.rol);
    } catch (err) {
      setError('Error en acceso rápido de operario: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Maflow RPA - Acceso</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Usuario / Correo" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <button 
        onClick={handleOperarioRapido}
        style={{ 
          width: '100%', 
          padding: '20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          fontSize: '18px', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer' 
        }}>
        ACCESO RÁPIDO OPERARIO
      </button>
    </div>
  );
};

export default Login;
