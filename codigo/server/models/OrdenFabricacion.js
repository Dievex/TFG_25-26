const { poolPromise, sql } = require('../config/db');

class OrdenFabricacion {
  static async findByPuesto(idPuesto) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idPuesto', sql.Int, idPuesto)
      .query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.ordenes WHERE idpuesto = @idPuesto');
    return result.recordset;
  }
}

module.exports = OrdenFabricacion;