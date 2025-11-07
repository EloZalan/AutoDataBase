import { TypesController } from '../../../src/controllers/typesController';
import Type from '../../../src/models/Type';
import { mockRequest, mockResponse } from 'jest-mock-req-res';

jest.mock('../../../src/models/Type');

describe('TypesController', () => {
    let typesController;
    let req;
    let res;

    beforeEach(() => {
        typesController = new TypesController();
        req = mockRequest();
        res = mockResponse();
    });

    describe('getAllTypes', () => {
        it('should return all types', async () => {
            const types = [{ name: 'SUV' }, { name: 'Sedan' }];
            Type.find.mockResolvedValue(types);
            Type.populate.mockResolvedValue(types);

            await typesController.getAllTypes(req, res);

            expect(res.json).toHaveBeenCalledWith(types);
        });

        it('should handle errors', async () => {
            Type.find.mockRejectedValue(new Error('Database error'));

            await typesController.getAllTypes(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch types' });
        });
    });

    describe('getTypeById', () => {
        it('should return a type by ID', async () => {
            const type = { name: 'SUV' };
            req.params.id = '1';
            Type.findById.mockResolvedValue(type);
            Type.populate.mockResolvedValue(type);

            await typesController.getTypeById(req, res);

            expect(res.json).toHaveBeenCalledWith(type);
        });

        it('should return 404 if type not found', async () => {
            req.params.id = '1';
            Type.findById.mockResolvedValue(null);

            await typesController.getTypeById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Type not found' });
        });

        it('should handle errors', async () => {
            req.params.id = '1';
            Type.findById.mockRejectedValue(new Error('Database error'));

            await typesController.getTypeById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch type' });
        });
    });

    describe('createType', () => {
        it('should create a new type', async () => {
            const newType = { name: 'SUV' };
            req.body = newType;
            Type.create.mockResolvedValue(newType);

            await typesController.createType(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newType);
        });

        it('should handle validation errors', async () => {
            req.body = {};
            Type.create.mockRejectedValue(new Error('Validation error'));

            await typesController.createType(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Validation error' });
        });
    });

    describe('updateType', () => {
        it('should update an existing type', async () => {
            const updatedType = { name: 'Updated SUV' };
            req.params.id = '1';
            req.body = updatedType;
            Type.findByIdAndUpdate.mockResolvedValue(updatedType);

            await typesController.updateType(req, res);

            expect(res.json).toHaveBeenCalledWith(updatedType);
        });

        it('should return 404 if type not found', async () => {
            req.params.id = '1';
            req.body = { name: 'Updated SUV' };
            Type.findByIdAndUpdate.mockResolvedValue(null);

            await typesController.updateType(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Type not found' });
        });

        it('should handle validation errors', async () => {
            req.params.id = '1';
            req.body = {};
            Type.findByIdAndUpdate.mockRejectedValue(new Error('Validation error'));

            await typesController.updateType(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Validation error' });
        });
    });

    describe('deleteType', () => {
        it('should delete a type', async () => {
            req.params.id = '1';
            Type.findByIdAndDelete.mockResolvedValue({});

            await typesController.deleteType(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: 'Type deleted' });
        });

        it('should return 404 if type not found', async () => {
            req.params.id = '1';
            Type.findByIdAndDelete.mockResolvedValue(null);

            await typesController.deleteType(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Type not found' });
        });

        it('should handle errors', async () => {
            req.params.id = '1';
            Type.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

            await typesController.deleteType(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete type' });
        });
    });
});