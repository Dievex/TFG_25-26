import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../views/auth/Login';

import DeclaracionForm from '../views/declaracion/DeclaracionForm';
import GestionUsuarios from '../views/admin/GestionUsuarios';
import LogCompleto from '../views/log/LogCompleto';
import Navbar from '../components/Navbar';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.rol ? user.rol.toLowerCase() : '';
  const allowed = allowedRoles ? allowedRoles.map(r => r.toLowerCase()) : [];

  if (allowedRoles && !allowed.includes(userRole)) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '20px' }}>Acceso Denegado. No tienes permisos para esta vista.</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/declaracion" 
        element={
          <ProtectedRoute allowedRoles={['Operario', 'Responsable', 'Administrador']}>
            <DeclaracionForm />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/log" 
        element={
          <ProtectedRoute allowedRoles={['Responsable', 'Administrador']}>
            <LogCompleto />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['Administrador']}>
            <GestionUsuarios />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
