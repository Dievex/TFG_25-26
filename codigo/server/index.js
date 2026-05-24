const express = require('express');
const cors = require('cors');
const env = require('./config/env');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Maflow RPA funcionando' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/declaracion', require('./routes/declaracionRoutes'));
app.use('/api/rpa', require('./routes/rpaRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/log', require('./routes/logRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(env.port, () => {
  console.log(`Servidor escuchando en http://localhost:${env.port}`);
});
