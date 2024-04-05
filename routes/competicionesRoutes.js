// routes/competicionesRoutes.js
const express = require('express');
const competicionesController = require('../controllers/competicionesController');
const router = express.Router();

router.get('/', competicionesController.getAllCompeticiones);
router.post('/', competicionesController.createCompeticion);
router.get('/:id', competicionesController.getCompeticion);
router.put('/:id', competicionesController.updateCompeticion);
router.delete('/:id', competicionesController.deleteCompeticion);

module.exports = router;
