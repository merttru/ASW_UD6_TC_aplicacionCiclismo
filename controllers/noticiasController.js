// controllers/noticiasController.js
const Noticia = require('../models/Noticia');

// Función auxiliar para obtener todas las noticias
async function fetchAllNoticias() {
  try {
    const noticias = await Noticia.find().sort({ fecha: -1 }); // Asegúrate de que la fecha es un objeto Date en tu esquema
    return noticias;
  } catch (error) {
    throw error;
  }
}
exports.fetchAllNoticias = fetchAllNoticias;

// Usa la función auxiliar dentro de la función del controlador que maneja la respuesta HTTP
exports.getAllNoticias = async (req, res) => {
  try {
    const noticias = await fetchAllNoticias();
    res.json(noticias);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener una noticia por ID
exports.getNoticia = async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id);
    if (!noticia) {
      return res.status(404).send('La noticia no fue encontrada.');
    }
    res.json(noticia);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Crear una nueva noticia
exports.createNoticia = async (req, res) => {
  try {
    const newNoticia = new Noticia(req.body);
    const savedNoticia = await newNoticia.save();
    res.status(201).json(savedNoticia);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Actualizar una noticia por ID
exports.updateNoticia = async (req, res) => {
  try {
    const updatedNoticia = await Noticia.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedNoticia) {
      return res.status(404).send('La noticia no fue encontrada.');
    }
    res.json(updatedNoticia);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar una noticia por ID
exports.deleteNoticia = async (req, res) => {
  try {
    const deletedNoticia = await Noticia.findByIdAndDelete(req.params.id);
    if (!deletedNoticia) {
      return res.status(404).send('La noticia no fue encontrada.');
    }
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).send(error);
  }
};
