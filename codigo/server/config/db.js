const sql = require('mssql');
const env = require('./env');

const poolPromise = new sql.ConnectionPool(env.db)
  .connect()
  .then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise
};
