const { poolPromise, sql } = require('../config/db');

class OrdenFabricacion {
  static async findByPuesto(idPuesto) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idPuesto', sql.Int, idPuesto)
      .query('SELECT ID as id, NUMBER as numero, IDPOSITION as idpuesto FROM RPA_PRUEBA.SNC.orders WHERE IDPOSITION = @idPuesto');
    return result.recordset;
  }
}

module.exports = OrdenFabricacion;