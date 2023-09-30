const express = require('express');
const pool = require('./db/db');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Establece EJS como el motor de plantillas

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  pool.query('SELECT * FROM users WHERE name = $1 AND password = $2', [username, password], (error, result) => {
    if (error) {
      return console.error('Error executing query', error);
    }

    if (result.rows.length > 0) {
      res.send('¡Inicio de sesión exitoso!');
    } else {
      res.send('Nombre de usuario o contraseña incorrectos');
    }
  });
});

// Nueva ruta GET para mostrar la página de inicio de sesión
app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
