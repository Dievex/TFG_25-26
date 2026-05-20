const { poolPromise, sql } = require('../config/db');
const bcrypt = require('bcrypt');

exports.getUsuarios = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT u.id, u.mail, u.estado, u.fecha, r.id as idrol, r.nombre as rol_nombre 
      FROM RPA_GALIAS_PRE_2.SNC.usuarios u 
      INNER JOIN RPA_GALIAS_PRE_2.SNC.roles r ON u.idrol = r.id
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error getUsuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.roles');
    res.json(result.recordset);
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

    const pool = await poolPromise;
    
    // Verificar si el correo ya existe
    const checkUser = await pool.request()
      .input('mail', sql.VarChar, mail)
      .query('SELECT id FROM RPA_GALIAS_PRE_2.SNC.usuarios WHERE mail = @mail');
      
    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input('mail', sql.VarChar, mail)
      .input('password', sql.VarChar, hashedPassword)
      .input('estado', sql.Bit, estado === undefined ? 1 : estado)
      .input('idrol', sql.Int, idrol)
      .query(`
        INSERT INTO RPA_GALIAS_PRE_2.SNC.usuarios (mail, password, estado, idrol) 
        VALUES (@mail, @password, @estado, @idrol)
      `);
      
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

    const pool = await poolPromise;

    let query = `
      UPDATE RPA_GALIAS_PRE_2.SNC.usuarios 
      SET mail = @mail, estado = @estado, idrol = @idrol
    `;
    
    const request = pool.request()
      .input('id', sql.Int, id)
      .input('mail', sql.VarChar, mail)
      .input('estado', sql.Bit, estado)
      .input('idrol', sql.Int, idrol);

    // Si se proporciona una nueva contraseña, la actualizamos también
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password = @password`;
      request.input('password', sql.VarChar, hashedPassword);
    }

    query += ` WHERE id = @id`;

    await request.query(query);

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error updateUsuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM RPA_GALIAS_PRE_2.SNC.usuarios WHERE id = @id');
      
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleteUsuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
