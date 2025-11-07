class TypesController {
    constructor(typesService) {
        this.typesService = typesService;
    }

    async getAllTypes(req, res) {
        try {
            const types = await this.typesService.getAllTypes();
            res.status(200).json(types);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTypeById(req, res) {
        const { id } = req.params;
        try {
            const type = await this.typesService.getTypeById(id);
            if (type) {
                res.status(200).json(type);
            } else {
                res.status(404).json({ message: 'Type not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createType(req, res) {
        const newType = req.body;
        try {
            const createdType = await this.typesService.createType(newType);
            res.status(201).json(createdType);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateType(req, res) {
        const { id } = req.params;
        const updatedType = req.body;
        try {
            const type = await this.typesService.updateType(id, updatedType);
            if (type) {
                res.status(200).json(type);
            } else {
                res.status(404).json({ message: 'Type not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteType(req, res) {
        const { id } = req.params;
        try {
            const success = await this.typesService.deleteType(id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Type not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default TypesController;