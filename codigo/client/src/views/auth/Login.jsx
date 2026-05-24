import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Activity, User, Lock, ChevronDown, UserCheck, AlertCircle, Sun, Moon } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, loginOperarioDirecto } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-[#1e293b] to-slate-900 overflow-hidden font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* Botón de Tema Flotante */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg transition-all duration-200"
        title="Alternar tema"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Círculos decorativos de fondo con desenfoque */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      
      <div className="relative w-full max-w-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 sm:p-10 transition-all duration-300 transform hover:scale-[1.01]">
        
        {/* Header de la tarjeta */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl mb-4 text-blue-600 dark:text-blue-400 shadow-inner">
            <Activity className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Maflow <span className="text-blue-600 dark:text-blue-400">RPA</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Portal de Declaración de Planta y Automatización de Procesos</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center p-4 text-sm rounded-xl border bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400">
            <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Formulario Principal */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Correo Electrónico / Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:text-white dark:placeholder-slate-400 transition-all duration-200"
                placeholder="ejemplo@maflow.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:text-white dark:placeholder-slate-400 transition-all duration-200"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200 text-sm"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Separador */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 dark:text-slate-500 font-semibold tracking-wider transition-colors duration-300">O también</span>
          </div>
        </div>

        {/* Botón de Acceso Rápido */}
        <button
          onClick={handleOperarioRapido}
          className="w-full group flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200/60 dark:border-emerald-800/60 rounded-xl text-emerald-800 dark:text-emerald-400 font-bold transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 bg-emerald-500 text-white rounded-lg group-hover:scale-110 transition-transform duration-200">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-emerald-900 dark:text-emerald-300">ACCESO RÁPIDO OPERARIO</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-500 font-medium">Entrada directa a terminal de producción</p>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 -rotate-90 text-emerald-600 dark:text-emerald-500 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        {/* Footer de créditos */}
        <div className="text-center mt-8 text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} Maflow Automotive. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};

export default Login;
