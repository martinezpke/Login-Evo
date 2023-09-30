const express = require('express');
const pool = require('./db/db');
const jwt = require('jsonwebtoken'); // Importar el módulo jwt

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

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
      const user = { id: result.rows[0].id, username: result.rows[0].name }; // Crear un objeto de usuario
      const accessToken = jwt.sign(user, 'tu_secreto'); // Firmar el token con una clave secreta

      res.json({ accessToken }); // Enviar el token como respuesta
    } else {
      res.status(401).send('Nombre de usuario o contraseña incorrectos');
    }
  });
});

// Nueva ruta GET para mostrar la página de inicio de sesión
app.get('/login', (req, res) => {
  res.render('login');
});

const verifyToken = (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(accessToken, 'tu_secreto', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Uso del middleware en una ruta protegida
app.get('/ruta-protegida', verifyToken, (req, res) => {
  res.send('Esta es una ruta protegida');
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
