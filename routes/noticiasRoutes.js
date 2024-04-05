// routes/noticiasRoutes.js
const express = require('express');
const noticiasController = require('../controllers/noticiasController');
const router = express.Router();

router.get('/', noticiasController.getAllNoticias);
router.post('/', noticiasController.createNoticia);
router.put('/:id', noticiasController.updateNoticia);
router.delete('/:id', noticiasController.deleteNoticia);

module.exports = router;
