import express from 'express';
import * as controller from '../controllers/brandsController.js';
const router = express.Router();

router.get('/', controller.getAllBrands);
router.get('/:id', controller.getBrandById);
router.post('/', controller.createBrand);
router.put('/:id', controller.updateBrand);
router.delete('/:id', controller.deleteBrand);

export default router;