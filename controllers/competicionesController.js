// controllers/competicionesController.js
const Competicion = require('../models/Competicion');

// Función auxiliar para obtener todas las competiciones
async function fetchAllCompeticiones() {
  try {
    const competiciones = await Competicion.find().sort({ fecha: 1 }); //  la fecha es un objeto Date en el esquema
    console.log(competiciones); // Agregamos este registro para verificar las competiciones recuperadas
    return competiciones;
  } catch (error) {
    throw error;
  }
}
exports.fetchAllCompeticiones = fetchAllCompeticiones;

// Usa la función auxiliar dentro de la función del controlador que maneja la respuesta HTTP
exports.getAllCompeticiones = async (req, res) => {
  try {
    const competiciones = await fetchAllCompeticiones();
    res.json(competiciones);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener una competición por ID
exports.getCompeticion = async (req, res) => {
  try {
    const competicion = await Competicion.findById(req.params.id);
    if (!competicion) {
      return res.status(404).send('La competición no fue encontrada.');
    }
    res.json(competicion);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Crear una nueva competición
exports.createCompeticion = async (req, res) => {
  try {
    const newCompeticion = new Competicion(req.body);
    const savedCompeticion = await newCompeticion.save();
    res.status(201).json(savedCompeticion);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Actualizar una competición por ID
exports.updateCompeticion = async (req, res) => {
  try {
    const updatedCompeticion = await Competicion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCompeticion) {
      return res.status(404).send('La competición no fue encontrada.');
    }
    res.json(updatedCompeticion);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar una competición por ID
exports.deleteCompeticion = async (req, res) => {
  try {
    const deletedCompeticion = await Competicion.findByIdAndDelete(req.params.id);
    if (!deletedCompeticion) {
      return res.status(404).send('La competición no fue encontrada.');
    }
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).send(error);
  }
};
