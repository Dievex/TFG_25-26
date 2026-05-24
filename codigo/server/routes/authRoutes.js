const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');


router.post('/login', [
  body('username').notEmpty().withMessage('El correo es obligatorio'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria')
], authController.login);

module.exports = router;
