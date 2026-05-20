const { poolPromise, sql } = require('../config/db');

exports.getPuestos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.puestos');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error getPuestos:', error);
    res.status(500).json({ error: 'Error al obtener puestos' });
  }
};

exports.getOrdenes = async (req, res) => {
  try {
    const { idPuesto } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idPuesto', sql.Int, idPuesto)
      .query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.ordenes WHERE idpuesto = @idPuesto');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error getOrdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

exports.getReferencias = async (req, res) => {
  try {
    const { idOrden } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idOrden', sql.Int, idOrden)
      .query('SELECT * FROM RPA_GALIAS_PRE_2.SNC.referencias WHERE idorden = @idOrden');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error getReferencias:', error);
    res.status(500).json({ error: 'Error al obtener referencias' });
  }
};

exports.getCantidadAnterior = async (req, res) => {
  try {
    const { idOrden } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idOrden', sql.Int, idOrden)
      .query('SELECT SUM(QUANTITY_MANUFACTURED) as total FROM RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap WHERE ORDER_ID = @idOrden');
    res.json({ total: result.recordset[0].total || 0 });
  } catch (error) {
    console.error('Error getCantidadAnterior:', error);
    res.status(500).json({ error: 'Error al obtener cantidad anterior' });
  }
};

exports.guardarDeclaracion = async (req, res) => {
  try {
    const { idPuesto, nombrePuesto, idOrden, numeroOrden, idReferencia, numeroReferencia, cantidad } = req.body;
    
    if (!idPuesto || !idOrden || !idReferencia || !cantidad || cantidad <= 0) {
      return res.status(400).json({ error: 'Faltan datos obligatorios o cantidad inválida' });
    }

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
      
    res.json({ message: 'Declaración guardada correctamente' });
  } catch (error) {
    console.error('Error guardarDeclaracion:', error);
    res.status(500).json({ error: 'Error al guardar declaración' });
  }
};

exports.getHistorialReciente = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT TOP 50 * FROM RPA_GALIAS_PRE_2.SNC.snc_sdp_order_order_x_line_spot_sap ORDER BY DATE_TIME DESC');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error getHistorialReciente:', error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};
