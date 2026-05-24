const { poolPromise, sql } = require('../config/db');

class Registro {
  static async getCantidadAnterior(idOrden) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idOrden', sql.Int, idOrden)
      .query('SELECT SUM(QUANTITY_MANUFACTURED) as total FROM RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap WHERE ORDER_ID = @idOrden');
    return result.recordset[0].total || 0;
  }

  static async guardar(data) {
    const { idOrden, numeroOrden, nombrePuesto, cantidad, numeroReferencia, idPuesto } = data;
    const pool = await poolPromise;
    await pool.request()
      .input('fecha', sql.DateTime, new Date())
      .input('idOrden', sql.Int, idOrden)
      .input('numeroOrden', sql.VarChar, numeroOrden)
      .input('nombrePuesto', sql.VarChar, nombrePuesto)
      .input('cantidad', sql.Int, cantidad)
      .input('numeroReferencia', sql.VarChar, numeroReferencia)
      .input('estado', sql.Int, 0) // 0 = Pendiente
      .input('idPuesto', sql.Int, idPuesto)
      .query(`
        INSERT INTO RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap 
        (DATE_TIME, ORDER_ID, ORDER_NUMBER, PRODUCTION_LINE, QUANTITY_MANUFACTURED, REFERENCE, SAP_STATUS, id_puesto) 
        VALUES (@fecha, @idOrden, @numeroOrden, @nombrePuesto, @cantidad, @numeroReferencia, @estado, @idPuesto)
      `);
  }

  static async getHistorialReciente() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT TOP 50 * FROM RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap ORDER BY DATE_TIME DESC');
    return result.recordset;
  }

  static async findAll() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap ORDER BY DATE_TIME DESC');
    return result.recordset;
  }

  static async update(originalDateTime, orderId, newCantidad, newEstado) {
    const pool = await poolPromise;
    await pool.request()
      .input('dateTime', sql.DateTime, new Date(originalDateTime))
      .input('orderId', sql.Int, orderId)
      .input('newCantidad', sql.Int, newCantidad)
      .input('newEstado', sql.Int, newEstado)
      .query(`
        UPDATE RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap 
        SET QUANTITY_MANUFACTURED = @newCantidad, SAP_STATUS = @newEstado 
        WHERE ORDER_ID = @orderId AND DATE_TIME = @dateTime
      `);
  }

  static async delete(originalDateTime, orderId) {
    const pool = await poolPromise;
    await pool.request()
      .input('dateTime', sql.DateTime, new Date(originalDateTime))
      .input('orderId', sql.Int, orderId)
      .query(`
        DELETE FROM RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap 
        WHERE ORDER_ID = @orderId AND DATE_TIME = @dateTime
      `);
  }

  static async findByFilters(query) {
    const pool = await poolPromise;
    const result = await pool.request().query(query);
    return result.recordset;
  }
}

module.exports = Registro;