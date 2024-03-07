import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.NODE_PORT;

const client = new pg.Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
});

client.connect((err) => {
  if (err) {
    console.error('Error en la conexión a PostgreSQL', err);
    return;
  }
  console.log('Conexión exitosa a PostgreSQL');
});

const createTableNote = `
  CREATE TABLE IF NOT EXISTS Note (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    detail TEXT
  )
`;

client.query(createTableNote, (err, result) => {
  if (err) {
    console.error('Error al crear la tabla Note en PostgreSQL', err);
    return;
  }
  console.log('Tabla Note creada correctamente en PostgreSQL');
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/notes', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM Note');
    const notes = result.rows;
    res.json(notes);
  } catch (err) {
    console.error('Error al obtener las notas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/notes', async (req, res) => {
  const { title, detail } = req.body;
  try {
    const result = await client.query('INSERT INTO Note (title, detail) VALUES ($1, $2) RETURNING ID', [title, detail]);
    const newNoteId = result.rows[0].id;
    res.status(201).json({ id: newNoteId, title, detail });
  } catch (err) {
    console.error('Error al crear la nota:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
