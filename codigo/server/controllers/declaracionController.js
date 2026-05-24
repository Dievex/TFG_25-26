const PuestoTrabajo = require('../models/PuestoTrabajo');
const OrdenFabricacion = require('../models/OrdenFabricacion');
const Referencia = require('../models/Referencia');
const Registro = require('../models/Registro');

exports.getPuestos = async (req, res) => {
  try {
    const puestos = await PuestoTrabajo.findAll();
    res.json(puestos);
  } catch (error) {
    console.error('Error getPuestos:', error);
    res.status(500).json({ error: 'Error al obtener puestos' });
  }
};

exports.getOrdenes = async (req, res) => {
  try {
    const { idPuesto } = req.params;
    const ordenes = await OrdenFabricacion.findByPuesto(idPuesto);
    res.json(ordenes);
  } catch (error) {
    console.error('Error getOrdenes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

exports.getReferencias = async (req, res) => {
  try {
    const { idOrden } = req.params;
    const referencias = await Referencia.findByOrden(idOrden);
    res.json(referencias);
  } catch (error) {
    console.error('Error getReferencias:', error);
    res.status(500).json({ error: 'Error al obtener referencias' });
  }
};

exports.getCantidadAnterior = async (req, res) => {
  try {
    const { idOrden } = req.params;
    const total = await Registro.getCantidadAnterior(idOrden);
    res.json({ total });
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

    await Registro.guardar({
      idPuesto, nombrePuesto, idOrden, numeroOrden, idReferencia, numeroReferencia, cantidad
    });
      
    res.json({ message: 'Declaración guardada correctamente' });
  } catch (error) {
    console.error('Error guardarDeclaracion:', error);
    res.status(500).json({ error: 'Error al guardar declaración' });
  }
};

exports.getHistorialReciente = async (req, res) => {
  try {
    const historial = await Registro.getHistorialReciente();
    res.json(historial);
  } catch (error) {
    console.error('Error getHistorialReciente:', error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};
