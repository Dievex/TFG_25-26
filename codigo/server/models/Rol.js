const { poolPromise, sql } = require('../config/db');

class Rol {
  static async findAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.roles');
    return result.recordset;
  }
}

module.exports = Rol;