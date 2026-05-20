import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Activity, 
  FileText, 
  ListTodo, 
  Users, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!user) return null;

  const r = user.rol ? user.rol.toLowerCase() : '';
  const isResponsableOrAdmin = r === 'responsable' || r === 'administrador';
  const isAdmin = r === 'administrador';

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y Marca */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="flex items-center justify-center p-2 bg-blue-600 rounded-xl text-white">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              Maflow <span className="text-blue-400">RPA</span>
            </span>
          </div>

          {/* Navegación Principal */}
          <nav className="hidden md:flex space-x-1">
            <NavLink
              to="/declaracion"
              className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Declaración</span>
            </NavLink>
            
            {isResponsableOrAdmin && (
              <NavLink
                to="/log"
                className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <ListTodo className="w-4 h-4" />
                <span>Log de Registros</span>
              </NavLink>
            )}

            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) => `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Gestión Usuarios</span>
              </NavLink>
            )}
          </nav>

          {/* Perfil de Usuario, Tema y Cerrar Sesión */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            <button
              onClick={toggleTheme}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors duration-150"
              title="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-slate-400 font-bold tracking-wide uppercase">Sesión iniciada</span>
              <span className="text-sm font-semibold text-slate-100 flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                <span>{user.mail}</span>
                <span className="text-xs bg-slate-800 text-blue-300 px-2 py-0.5 rounded font-extrabold ml-1">
                  {user.rol}
                </span>
              </span>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil */}
      <div className="flex md:hidden border-t border-slate-800 bg-slate-900 px-2 py-1 justify-around">
        <NavLink
          to="/declaracion"
          className={({ isActive }) => `flex flex-col items-center justify-center py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
            isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-400'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span>Declaración</span>
        </NavLink>
        {isResponsableOrAdmin && (
          <NavLink
            to="/log"
            className={({ isActive }) => `flex flex-col items-center justify-center py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
              isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-400'
            }`}
          >
            <ListTodo className="w-5 h-5 mb-0.5" />
            <span>Registros</span>
          </NavLink>
        )}
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) => `flex flex-col items-center justify-center py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
              isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-400'
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span>Usuarios</span>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
