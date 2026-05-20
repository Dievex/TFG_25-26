const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Solo Administrador puede acceder a estas rutas
router.use(verifyToken);
router.use(checkRole(['Administrador']));

router.get('/', usuarioController.getUsuarios);
router.get('/roles', usuarioController.getRoles);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
