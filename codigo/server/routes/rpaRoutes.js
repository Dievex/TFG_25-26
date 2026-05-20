const express = require('express');
const router = express.Router();
const rpaController = require('../controllers/rpaController');
const { verifyToken, checkRole } = require('../middleware/auth');

router.use(verifyToken);
router.use(checkRole(['Operario', 'Responsable', 'Administrador']));

router.post('/activar', rpaController.activarRobot);

module.exports = router;
