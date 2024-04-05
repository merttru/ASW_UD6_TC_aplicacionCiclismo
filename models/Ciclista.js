const mongoose = require('mongoose');

const ciclistaSchema = new mongoose.Schema({
  idciclista: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  ico: {
    type: String,
    required: true
  },
  fecha_nacimiento: {
    type: String,
    required: true
  },

  nacionalidad: {
    type: String,
    required: true
  },
  altura: {
    type: String,
    required: false
  },
  peso: {
    type: String,
    required: false
  },
  logros: {
    type: String,
    required: false
  },
  clubes: [String], // Array de clubes
  palmares: [String] // Array de palmares
});

module.exports = mongoose.model('Ciclista', ciclistaSchema, "ciclistas");
