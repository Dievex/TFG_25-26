const { exec } = require('child_process');
const path = require('path');
const env = require('../config/env');

class RpaService {
  static activarRobot() {
    const rpaPath = env.rpaBatPath;
    const dir = path.dirname(rpaPath);
    const file = path.basename(rpaPath);

    const cmd = `cd /d "${dir}" && "${file}"`;
    
    console.log(`--> Ejecutando archivo .bat del RPA con comando: ${cmd}`);

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar el bat: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}

module.exports = RpaService;