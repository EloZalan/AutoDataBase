import express from 'express';
import * as controller from '../controllers/typesController.js';
const router = express.Router();

router.get('/', controller.getAllTypes);
router.get('/:id', controller.getTypeById);
router.post('/', controller.createType);
router.put('/:id', controller.updateType);
router.delete('/:id', controller.deleteType);

export default router;