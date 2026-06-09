const Registro = require('../models/Registro');

exports.getLogs = async (req, res) => {
  try {
    const logs = await Registro.findAll();
    res.json(logs);
  } catch (error) {
    console.error('Error getLogs:', error);
    res.status(500).json({ error: 'Error al obtener logs' });
  }
};

exports.exportarCSV = async (req, res) => {
  try {
    const { estado, puesto, orden, referencia } = req.query;
    
    let query = 'SELECT * FROM RPA_PRUEBA.SNC.snc_sdp_order_order_x_line_spot_sap WHERE 1=1';
    
    if (estado && estado !== 'Todos') {
      query += ` AND SAP_STATUS = ${parseInt(estado, 10)}`;
    }
    if (puesto) {
      query += ` AND PRODUCTION_LINE LIKE '%${puesto}%'`;
    }
    if (orden) {
      query += ` AND ORDER_NUMBER LIKE '%${orden}%'`;
    }
    if (referencia) {
      query += ` AND REFERENCE LIKE '%${referencia}%'`;
    }
    
    query += ' ORDER BY DATE_TIME DESC';

    const records = await Registro.findByFilters(query);
    
    if (records.length === 0) {
      return res.status(404).json({ error: 'No hay registros para exportar' });
    }
    
    const headers = ['Fecha', 'Puesto', 'Orden', 'Referencia', 'Cantidad', 'Estado'];
    const rows = records.map(log => {
      const fecha = new Date(log.DATE_TIME).toLocaleString('es-ES');
      const puestoStr = log.PRODUCTION_LINE || '';
      const ordenStr = log.ORDER_NUMBER || '';
      const refStr = log.REFERENCE || '';
      const cant = log.QUANTITY_MANUFACTURED || 0;
      let estadoStr = 'Desconocido';
      switch(log.SAP_STATUS) {
        case 0: estadoStr = 'Pendiente'; break;
        case 1: estadoStr = 'Completado'; break;
        case 2: estadoStr = 'Error'; break;
        case 3: estadoStr = 'En revisión'; break;
      }
      return `"${fecha}","${puestoStr}","${ordenStr}","${refStr}",${cant},"${estadoStr}"`;
    });
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="logs_export.csv"');
    res.send(Buffer.from('\uFEFF' + csvContent, 'utf-8'));
  } catch (error) {
    console.error('Error exportarCSV:', error);
    res.status(500).json({ error: 'Error al exportar CSV' });
  }
};

exports.updateLog = async (req, res) => {
  try {
    const { originalDateTime, orderId, newCantidad, newEstado } = req.body;

    if (!originalDateTime || !orderId) {
      return res.status(400).json({ error: 'Faltan datos de identificación del registro' });
    }

    await Registro.update(originalDateTime, orderId, newCantidad, newEstado);

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

    await Registro.delete(originalDateTime, orderId);

    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('Error deleteLog:', error);
    res.status(500).json({ error: 'Error al eliminar registro' });
  }
};
