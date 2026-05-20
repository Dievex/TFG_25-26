const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const env = require('../config/env');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Por favor, introduce correo y contraseña' });
    }

    const usuario = await Usuario.findByMail(username);

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    if (!usuario.estado) {
      return res.status(403).json({ error: 'Usuario inactivo. Contacta con el administrador' });
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar JWT
    const payload = {
      userId: usuario.id,
      rol: usuario.rol_nombre,
    };

    const token = jwt.sign(payload, env.jwtSecret, { expiresIn: '8h' });

    res.json({
      message: 'Autenticación exitosa',
      token,
      usuario: {
        id: usuario.id,
        mail: usuario.mail,
        rol: usuario.rol_nombre
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
