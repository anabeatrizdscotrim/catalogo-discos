const express = require('express');
const router = express.Router();
const discoController = require('../controllers/discoController');

router.post('/', discoController.createDisco);
router.get('/', discoController.getDiscos);
router.get('/search', discoController.searchDisco);
router.put('/:id', discoController.updateDisco);
router.delete('/:id', discoController.deleteDisco);

module.exports = router;
