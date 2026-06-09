const { poolPromise, sql } = require('../config/db');

class Referencia {
  static async findByOrden(idOrden) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idOrden', sql.Int, idOrden)
      .query('SELECT ID as id, NUMBER as numero, IDORDER as idorden FROM RPA_PRUEBA.SNC.reference WHERE IDORDER = @idOrden');
    return result.recordset;
  }
}

module.exports = Referencia;