const express = require('express');
const cors = require('cors');
const env = require('./config/env');

const app = express();

// Middlewares globales
app.use(cors()); // Permite peticiones desde el frontend (podemos limitarlo luego a un origen específico)
app.use(express.json()); // Parsea body en formato JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Maflow RPA funcionando' });
});

// Importar rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/declaracion', require('./routes/declaracionRoutes'));
app.use('/api/rpa', require('./routes/rpaRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/log', require('./routes/logRoutes'));

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(env.port, () => {
  console.log(`Servidor escuchando en http://localhost:${env.port}`);
});
