const { poolPromise, sql } = require('../config/db');

class PuestoTrabajo {
  static async findAll() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT ID as id, NAME as nombre, DESCRIPTION as descripcion FROM RPA_PRUEBA.SNC.line_spot');
    return result.recordset;
  }
}

module.exports = PuestoTrabajo;