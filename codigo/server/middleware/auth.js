const jwt = require('jsonwebtoken');
const env = require('../config/env');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded; // { userId, rol, iat, exp }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

const checkRole = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !req.user.rol) {
      return res.status(403).json({ error: 'No tienes un rol asignado' });
    }

    const userRole = req.user.rol.toLowerCase();
    const allowed = rolesPermitidos.map(r => r.toLowerCase());

    if (!allowed.includes(userRole)) {
      return res.status(403).json({ error: 'Acceso denegado. Permisos insuficientes' });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  checkRole
};
