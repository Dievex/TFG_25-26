require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
      encrypt: false, // set to true si usas Azure
      trustServerCertificate: true,
    },
  },
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  rpaUrl: process.env.RPA_URL
};
