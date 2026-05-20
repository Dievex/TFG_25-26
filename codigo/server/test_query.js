const { poolPromise, sql } = require('./config/db');

async function test() {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT u.*, r.nombre as rol_nombre FROM RPA_GALIAS_PRE_2.SNC.usuarios u INNER JOIN RPA_GALIAS_PRE_2.SNC.roles r ON u.idrol = r.id WHERE u.mail = 'operario@maflow.com'");
  console.log('Usuario:', result.recordset[0]);
  if (result.recordset[0]) {
    console.log('Rol:', `'${result.recordset[0].rol_nombre}'`);
  }
  process.exit(0);
}
test();
