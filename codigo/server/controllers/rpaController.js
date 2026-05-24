const rpaService = require('../services/rpaService');

exports.activarRobot = (req, res) => {
  rpaService.activarRobot();
  res.json({ message: 'Se ha enviado la señal al robot RPA correctamente' });
};
