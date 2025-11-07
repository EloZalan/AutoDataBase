class BrandsController {
    constructor(brandsService) {
        this.brandsService = brandsService;
    }

    async getAllBrands(req, res) {
        try {
            const brands = await this.brandsService.getAllBrands();
            res.status(200).json(brands);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getBrandById(req, res) {
        const { id } = req.params;
        try {
            const brand = await this.brandsService.getBrandById(id);
            if (brand) {
                res.status(200).json(brand);
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createBrand(req, res) {
        const newBrand = req.body;
        try {
            const createdBrand = await this.brandsService.createBrand(newBrand);
            res.status(201).json(createdBrand);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateBrand(req, res) {
        const { id } = req.params;
        const updatedBrand = req.body;
        try {
            const brand = await this.brandsService.updateBrand(id, updatedBrand);
            if (brand) {
                res.status(200).json(brand);
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteBrand(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.brandsService.deleteBrand(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BrandsController;