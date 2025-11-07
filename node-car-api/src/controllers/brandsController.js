import Brand from '../models/Brand.js';

class BrandsController {
    async getAllBrands(req, res) {
        try {
            const brands = await Brand.find();
            res.json(brands);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch brands' });
        }
    }

    async getBrandById(req, res) {
        try {
            const brand = await Brand.findById(req.params.id);
            if (!brand) return res.status(404).json({ error: 'Brand not found' });
            res.json(brand);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch brand' });
        }
    }

    async createBrand(req, res) {
        try {
            const newBrand = await Brand.create(req.body);
            res.status(201).json(newBrand);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async updateBrand(req, res) {
        try {
            const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updated) return res.status(404).json({ error: 'Brand not found' });
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deleteBrand(req, res) {
        try {
            const deleted = await Brand.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Brand not found' });
            res.json({ message: 'Brand deleted' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete brand' });
        }
    }
}

const controller = new BrandsController();
export const getAllBrands = controller.getAllBrands.bind(controller);
export const getBrandById = controller.getBrandById.bind(controller);
export const createBrand = controller.createBrand.bind(controller);
export const updateBrand = controller.updateBrand.bind(controller);
export const deleteBrand = controller.deleteBrand.bind(controller);