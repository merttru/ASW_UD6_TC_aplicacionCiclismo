const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const noticiasRoutes = require("./routes/noticiasRoutes");
const competicionesRoutes = require("./routes/competicionesRoutes");
const ciclistasRoutes = require("./routes/ciclistasRoutes");
const noticiasController = require("./controllers/noticiasController");
const competicionesController = require("./controllers/competicionesController");
const ciclistasController = require("./controllers/ciclistasController");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public'), {
  // Especificar los tipos MIME para los archivos estáticos
  // Aquí  incluimos 'text/css' para los archivos CSS
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.use(express.json());
app.use("/api/noticias", noticiasRoutes);
app.use("/api/competiciones", competicionesRoutes);
app.use("/api/ciclistas", ciclistasRoutes);

// Conexión a MongoDB
mongoose
  .connect(
    "mongodb+srv://fernandomartinfernandez:1jn14v0i3nCHqPs8@aplicacionesweb.h5n8jsu.mongodb.net/AplicacionesWebTC?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
    mongoose.set("strictQuery", true);
  })
  .catch((error) =>
    console.error("Error al conectar con MongoDB Atlas:", error)
  );

  // Ruta principal para renderizar la vista index con noticias
app.get("/", async (req, res) => {
  try {
    const noticias = await noticiasController.fetchAllNoticias();
    res.render("index", { noticias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las noticias");
  }
});

// Ruta para renderizar la vista de competiciones
app.get("/competiciones", async (req, res) => {
  try {
    const competiciones = await competicionesController.fetchAllCompeticiones();
    res.render("competiciones", { competiciones });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las competiciones");
  }
});
// Ruta principal para renderizar la vista de ciclistas
app.get("/ciclistas", async (req, res) => {
  try {
    const ciclistas = await ciclistasController.fetchAllCiclistas();
    res.render("ciclistas", { ciclistas });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los ciclistas");
  }
});
// Ruta para obtener los datos de un ciclista por ID

app.get("/ciclista", ciclistasController.getCiclistaByQuery);

// Ruta para renderizar la vista de autores
app.get("/datos_administrador", (req, res) => {
  res.render("aviso_legal"); // Renderiza la vista de autores
});
// Ruta para renderizar la vista de aviso legal
app.get("/aviso_legal", (req, res) => {
  res.render("aviso_legal"); // Renderiza la vista de aviso_legal
});
// Ruta para renderizar la vista de política de accesibilildad 
app.get("/politica_accesibilidad", (req, res) => {
  res.render("politica_accesibilidad"); // Renderiza la vista accesibilidad
});
// Ruta para renderizar la vista de contacto
app.get("/contacto", (req, res) => {
  res.render("contacto"); // Renderiza la vista contacto
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
