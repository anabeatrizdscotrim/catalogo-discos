const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

router.post('/', generoController.createGenero);
router.get('/', generoController.getGeneros);
router.put('/:id', generoController.updateGenero);
router.delete('/:id', generoController.deleteGenero);

module.exports = router;
