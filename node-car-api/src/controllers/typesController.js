import Type from '../models/Type.js';

class TypesController {

    async getAllTypes(req, res) {
        try {
            const types = await Type.find().populate('brand');
            res.json(types);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch types' });
        }
    }

    async getTypeById(req, res) {
        try {
            const type = await Type.findById(req.params.id).populate('brand');
            if (!type) return res.status(404).json({ error: 'Type not found' });
            res.json(type);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch type' });
        }
    }

    async createType(req, res) {
        try {
            const newType = await Type.create(req.body);
            res.status(201).json(newType);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async updateType(req, res) {
        try {
            const updated = await Type.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updated) return res.status(404).json({ error: 'Type not found' });
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deleteType(req, res) {
        try {
            const deleted = await Type.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Type not found' });
            res.json({ message: 'Type deleted' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete type' });
        }
    }
}

const controller = new TypesController();
export const getAllTypes = controller.getAllTypes.bind(controller);
export const getTypeById = controller.getTypeById.bind(controller);
export const createType = controller.createType.bind(controller);
export const updateType = controller.updateType.bind(controller);
export const deleteType = controller.deleteType.bind(controller);