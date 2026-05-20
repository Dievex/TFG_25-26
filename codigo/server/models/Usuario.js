const { poolPromise, sql } = require('../config/db');

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

  // Agregaremos más métodos luego según se necesiten (crear, listar, etc.)
}

module.exports = Usuario;
