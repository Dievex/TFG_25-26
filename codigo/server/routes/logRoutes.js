const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Protegido para Responsable o Administrador
router.use(verifyToken);
router.use(checkRole(['Responsable', 'Administrador']));

router.get('/', logController.getLogs);
router.get('/exportar', logController.exportarCSV);
router.put('/', logController.updateLog);
router.delete('/', logController.deleteLog);

module.exports = router;
