const { poolPromise, sql } = require('../config/db');

class Rol {
  static async findAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT id, nombre, descripcion FROM RPA_PRUEBA.SNC.rols');
    return result.recordset;
  }
}

module.exports = Rol;