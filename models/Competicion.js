
const mongoose = require("mongoose");

const competicionSchema = new mongoose.Schema({
  idCompeticion: { type: Number, required: true, unique: true },
  fecha: { type: Date, required: true },
  pais: { type: String, required: true },
  evento: { type: String, required: true },
  categoria: { type: String, required: true },
  enlacecomp: { type: String, required: true },
  enlacepalm: { type: String, required: true },
  ganadorh: { type: String, required: true },
  ganadorf: { type: String, required: true }
});


module.exports = mongoose.model("Competicion", competicionSchema, "competiciones");