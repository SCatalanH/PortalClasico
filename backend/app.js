const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/user'));  // Asegúrate de incluir esta línea
const profile = require('./routes/profile');
app.use('/api', profile);

module.exports = app;
