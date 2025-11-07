class TypesService {
    constructor() {
        this.fs = require('fs');
        this.path = require('path');
        this.filePath = path.join(__dirname, '../data/carTypes.json');
    }

    getAllTypes() {
        const data = this.fs.readFileSync(this.filePath);
        return JSON.parse(data);
    }

    getTypeById(id) {
        const types = this.getAllTypes();
        return types.find(type => type.id === id);
    }

    createType(newType) {
        const types = this.getAllTypes();
        types.push(newType);
        this.fs.writeFileSync(this.filePath, JSON.stringify(types, null, 2));
        return newType;
    }

    updateType(id, updatedType) {
        const types = this.getAllTypes();
        const index = types.findIndex(type => type.id === id);
        if (index !== -1) {
            types[index] = { ...types[index], ...updatedType };
            this.fs.writeFileSync(this.filePath, JSON.stringify(types, null, 2));
            return types[index];
        }
        return null;
    }

    deleteType(id) {
        let types = this.getAllTypes();
        const initialLength = types.length;
        types = types.filter(type => type.id !== id);
        if (types.length < initialLength) {
            this.fs.writeFileSync(this.filePath, JSON.stringify(types, null, 2));
            return true;
        }
        return false;
    }
}

module.exports = TypesService;