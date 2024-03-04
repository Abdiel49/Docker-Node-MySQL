const express = require('express');
const mysql = require('mysql2');
require('dotenv').config()

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'notes_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

connection.query(`CREATE TABLE IF NOT EXISTS Note (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  detail TEXT
)`, (err) => {
  if (err) {
    console.error('Error al crear la tabla Note:', err);
    return;
  }
  console.log('Tabla Note creada correctamente');
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/notes', (req, res) => {
  connection.query('SELECT * FROM Note', (err, results) => {
    if (err) {
      console.error('Error al obtener las notas:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(results);
  });
});

app.post('/notes', (req, res) => {
  const { title, detail } = req.body;
  connection.query('INSERT INTO Note (title, detail) VALUES (?, ?)', [title, detail], (err, result) => {
    if (err) {
      console.error('Error al crear la nota:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(201).json({ id: result.insertId, title, detail });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
