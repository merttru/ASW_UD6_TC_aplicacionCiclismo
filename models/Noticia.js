const mongoose = require("mongoose");

const noticiaSchema = new mongoose.Schema({
  idNoticia: {
    type: Number,
    required: true,
    unique: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  noticiaWeb: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Noticia", noticiaSchema);
