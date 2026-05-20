const express = require('express');
const router = express.Router();
const declaracionController = require('../controllers/declaracionController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Todos estos endpoints requieren estar logueado como Operario (o superior)
router.use(verifyToken);
router.use(checkRole(['Operario', 'Responsable', 'Administrador']));

router.get('/puestos', declaracionController.getPuestos);
router.get('/ordenes/:idPuesto', declaracionController.getOrdenes);
router.get('/referencias/:idOrden', declaracionController.getReferencias);
router.get('/cantidad/:idOrden', declaracionController.getCantidadAnterior);
router.post('/guardar', declaracionController.guardarDeclaracion);
router.get('/historial', declaracionController.getHistorialReciente);

module.exports = router;
