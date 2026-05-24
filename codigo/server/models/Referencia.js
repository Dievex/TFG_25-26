const { poolPromise, sql } = require('../config/db');

class Referencia {
  static async findByOrden(idOrden) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idOrden', sql.Int, idOrden)
      .query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.referencias WHERE idorden = @idOrden');
    return result.recordset;
  }
}

module.exports = Referencia;