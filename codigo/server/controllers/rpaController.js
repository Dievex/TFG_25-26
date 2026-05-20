exports.activarRobot = (req, res) => {
  // Aquí iría la lógica para ejecutar el archivo .bat
  // Ejemplo:
  // const { exec } = require('child_process');
  // exec('C:\\Ruta\\al\\robot.bat', (error, stdout, stderr) => { ... });
  
  console.log("--> SIMULANDO: Ejecución del archivo .bat del RPA para interactuar con SAP");
  
  // Retornamos éxito de la llamada
  res.json({ message: 'Se ha enviado la señal al robot RPA correctamente' });
};
