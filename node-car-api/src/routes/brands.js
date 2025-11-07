const express = require('express');
const router = express.Router();
const BrandsController = require('../controllers/brandsController');

const brandsController = new BrandsController();

router.get('/', brandsController.getAllBrands.bind(brandsController));
router.get('/:id', brandsController.getBrandById.bind(brandsController));
router.post('/', brandsController.createBrand.bind(brandsController));
router.put('/:id', brandsController.updateBrand.bind(brandsController));
router.delete('/:id', brandsController.deleteBrand.bind(brandsController));

module.exports = router;