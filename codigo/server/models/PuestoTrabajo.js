const { poolPromise, sql } = require('../config/db');

class PuestoTrabajo {
  static async findAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.puestos');
    return result.recordset;
  }
}

module.exports = PuestoTrabajo;