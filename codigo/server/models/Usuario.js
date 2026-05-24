const { poolPromise, sql } = require('../config/db');
const bcrypt = require('bcrypt');

class Usuario {
  static async findByMail(mail) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('mail', sql.VarChar, mail)
        .query(`
          SELECT u.*, r.nombre as rol_nombre 
          FROM RPA_GALIAS_PRE_2.SNC.usuarios u 
          INNER JOIN RPA_GALIAS_PRE_2.SNC.roles r ON u.idrol = r.id 
          WHERE u.mail = @mail
        `);
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT u.id, u.mail, u.estado, u.fecha, r.id as idrol, r.nombre as rol_nombre 
      FROM RPA_GALIAS_PRE_2.SNC.usuarios u 
      INNER JOIN RPA_GALIAS_PRE_2.SNC.roles r ON u.idrol = r.id
    `);
    return result.recordset;
  }

  static async create(data) {
    const { mail, password, idrol, estado } = data;
    const pool = await poolPromise;
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
  }

  static async update(id, data) {
    const { mail, password, idrol, estado } = data;
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

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password = @password`;
      request.input('password', sql.VarChar, hashedPassword);
    }

    query += ` WHERE id = @id`;
    await request.query(query);
  }

  static async delete(id) {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM RPA_GALIAS_PRE_2.SNC.usuarios WHERE id = @id');
  }
}

module.exports = Usuario;
