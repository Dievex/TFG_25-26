const { exec } = require('child_process');
const env = require('../config/env');

exports.activarRobot = (req, res) => {

  const batPath = `"${env.rpaBatPath}"`;
  
  console.log(`--> Ejecutando archivo .bat del RPA en la ruta: ${batPath}`);
  
  res.json({ message: 'Se ha enviado la señal al robot RPA correctamente' });

  exec(batPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el bat: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  });
};
