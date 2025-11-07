class BrandsService {
    constructor() {
        this.fs = require('fs');
        this.path = require('path');
        this.filePath = this.path.join(__dirname, '../data/carBrands.json');
    }

    getAllBrands() {
        const data = this.fs.readFileSync(this.filePath);
        return JSON.parse(data);
    }

    getBrandById(id) {
        const brands = this.getAllBrands();
        return brands.find(brand => brand.id === id);
    }

    createBrand(newBrand) {
        const brands = this.getAllBrands();
        brands.push(newBrand);
        this.fs.writeFileSync(this.filePath, JSON.stringify(brands, null, 2));
        return newBrand;
    }

    updateBrand(id, updatedBrand) {
        const brands = this.getAllBrands();
        const index = brands.findIndex(brand => brand.id === id);
        if (index !== -1) {
            brands[index] = { ...brands[index], ...updatedBrand };
            this.fs.writeFileSync(this.filePath, JSON.stringify(brands, null, 2));
            return brands[index];
        }
        return null;
    }

    deleteBrand(id) {
        let brands = this.getAllBrands();
        const index = brands.findIndex(brand => brand.id === id);
        if (index !== -1) {
            const deletedBrand = brands.splice(index, 1);
            this.fs.writeFileSync(this.filePath, JSON.stringify(brands, null, 2));
            return deletedBrand[0];
        }
        return null;
    }
}

module.exports = BrandsService;