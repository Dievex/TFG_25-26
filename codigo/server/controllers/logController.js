const { poolPromise, sql } = require('../config/db');

exports.getLogs = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap ORDER BY DATE_TIME DESC');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error getLogs:', error);
    res.status(500).json({ error: 'Error al obtener logs' });
  }
};

exports.updateLog = async (req, res) => {
  try {
    // Al no tener una Primary Key (ID) única en la tabla, usaremos DATE_TIME y ORDER_ID para identificar la fila
    const { originalDateTime, orderId, newCantidad, newEstado } = req.body;

    if (!originalDateTime || !orderId) {
      return res.status(400).json({ error: 'Faltan datos de identificación del registro' });
    }

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

    res.json({ message: 'Registro actualizado correctamente' });
  } catch (error) {
    console.error('Error updateLog:', error);
    res.status(500).json({ error: 'Error al actualizar registro' });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const { originalDateTime, orderId } = req.body;

    if (!originalDateTime || !orderId) {
      return res.status(400).json({ error: 'Faltan datos de identificación del registro' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('dateTime', sql.DateTime, new Date(originalDateTime))
      .input('orderId', sql.Int, orderId)
      .query(`
        DELETE FROM RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap 
        WHERE ORDER_ID = @orderId AND DATE_TIME = @dateTime
      `);

    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('Error deleteLog:', error);
    res.status(500).json({ error: 'Error al eliminar registro' });
  }
};
