// routes/ciclistasRoutes.js
const express = require('express');
const ciclistasController = require('../controllers/ciclistasController');
const router = express.Router();

router.get('/', ciclistasController.getAllCiclistas);
router.post('/', ciclistasController.createCiclista);
router.get('/ciclista', ciclistasController.getCiclistaByQuery);
router.put('/:id', ciclistasController.updateCiclista);
router.delete('/:id', ciclistasController.deleteCiclista);

module.exports = router;
