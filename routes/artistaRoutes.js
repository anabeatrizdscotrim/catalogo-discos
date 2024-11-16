const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

router.post('/', artistaController.createArtista);
router.get('/', artistaController.getArtistas);
router.get('/search', artistaController.searchArtista);
router.put('/:id', artistaController.updateArtista);
router.delete('/:id', artistaController.deleteArtista);

module.exports = router;
