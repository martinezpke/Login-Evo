const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar express-session
app.use(
  session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

// Rutas
app.get("/", (req, res) => {
  res.send("Página de inicio");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Aquí deberías verificar las credenciales y autenticar al usuario
  // Por simplicidad, lo dejaremos como un ejercicio adicional.
  if (username === "usuario" && password === "contraseña") {
    req.session.authenticated = true;
    res.send("¡Inicio de sesión exitoso!");
  } else {
    res.send("Credenciales incorrectas");
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
