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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await knex("users").where({ username }).first();

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, "secret-key", {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
});

app.get("/dashboard", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    const userId = decoded.userId;
    res.json({ message: `¡Bienvenido! Usuario ID: ${userId}` });
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
