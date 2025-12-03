require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API base
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`✅ AndyHub escuchando en http://localhost:${PORT}`);
});
