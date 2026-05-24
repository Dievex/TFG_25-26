const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error getUsuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    console.error('Error getRoles:', error);
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { mail, password, idrol, estado } = req.body;
    
    if (!mail || !password || !idrol) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Verificar si el correo ya existe
    const checkUser = await Usuario.findByMail(mail);
      
    if (checkUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    await Usuario.create({ mail, password, idrol, estado });
      
    res.json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error createUsuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { mail, password, idrol, estado } = req.body;

    if (!mail || !idrol) {
      return res.status(400).json({ error: 'Correo y Rol son obligatorios' });
    }

    await Usuario.update(id, { mail, password, idrol, estado });

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error updateUsuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.delete(id);
      
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleteUsuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
