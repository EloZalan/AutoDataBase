const express = require('express');
const router = express.Router();
const TypesController = require('../controllers/typesController');

const typesController = new TypesController();

router.get('/', typesController.getAllTypes.bind(typesController));
router.get('/:id', typesController.getTypeById.bind(typesController));
router.post('/', typesController.createType.bind(typesController));
router.put('/:id', typesController.updateType.bind(typesController));
router.delete('/:id', typesController.deleteType.bind(typesController));

module.exports = router;