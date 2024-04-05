// controllers/ciclistasController.js
const Ciclista = require('../models/Ciclista');

// Función auxiliar para obtener todos las ciclistas
async function fetchAllCiclistas() {
  try {
    const ciclistas = await Ciclista.find().sort({ idciclista: 1 }) 
    console.log(ciclistas); // Agregamos este registro para verificar las competiciones recuperadas
    return ciclistas;
  } catch (error) {
    throw error;
  }
}
exports.fetchAllCiclistas = fetchAllCiclistas;

// Usa la función auxiliar dentro de la función del controlador que maneja la respuesta HTTP
exports.getAllCiclistas = async (req, res) => {
  try {
    const ciclistas = await fetchAllCiclistas();
    res.json(ciclistas);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para obtener un ciclista por ID
exports.getCiclistaByQuery = async (req, res) => {
  try {
    const idCiclista = req.query.idciclista;
    console.log('ID del ciclista:', idCiclista);

    const ciclista = await Ciclista.findOne({ idciclista: idCiclista });
    if (!ciclista) {
      return res.status(404).send('Ciclista no encontrado.');
    }
    return res.render('ciclista', { ciclista: ciclista }); // Agrega return aquí
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al obtener el ciclista"); // Agrega return aquí
  }
};

// Crear un nuevo ciclista
exports.createCiclista = async (req, res) => {
  try {
    const newCiclista = new Ciclista(req.body);
    const savedCiclista = await newCiclista.save();
    res.status(201).json(savedCiclista);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Actualizar un ciclista por ID
exports.updateCiclista = async (req, res) => {
  try {
    const updatedCiclista = await Ciclista.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCiclista) {
      return res.status(404).send('El ciclista no fue encontrado.');
    }
    res.json(updatedCiclista);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un ciclista por ID
exports.deleteCiclista = async (req, res) => {
  try {
    const deletedCiclista = await Ciclista.findByIdAndDelete(req.params.id);
    if (!deletedCiclista) {
      return res.status(404).send('El ciclista no fue encontrado.');
    }
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).send(error);
  }
};

