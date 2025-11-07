const typesService = require('../../../src/services/typesService');
const Type = require('../../../src/models/Type');
const { mockTypes } = require('../../test-utils/fixtures/types.fixture');
const TypeMock = require('../../test-utils/mocks/models/Type.mock');

jest.mock('../../../src/models/Type');

describe('Types Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTypes', () => {
        it('should return all types', async () => {
            Type.find.mockResolvedValue(mockTypes);
            const types = await typesService.getAllTypes();
            expect(types).toEqual(mockTypes);
            expect(Type.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('getTypeById', () => {
        it('should return a type by id', async () => {
            const typeId = '12345';
            Type.findById.mockResolvedValue(mockTypes[0]);
            const type = await typesService.getTypeById(typeId);
            expect(type).toEqual(mockTypes[0]);
            expect(Type.findById).toHaveBeenCalledWith(typeId);
        });

        it('should return null if type not found', async () => {
            const typeId = '54321';
            Type.findById.mockResolvedValue(null);
            const type = await typesService.getTypeById(typeId);
            expect(type).toBeNull();
            expect(Type.findById).toHaveBeenCalledWith(typeId);
        });
    });

    describe('createType', () => {
        it('should create a new type', async () => {
            const newTypeData = { name: 'New Type' };
            Type.create.mockResolvedValue(newTypeData);
            const createdType = await typesService.createType(newTypeData);
            expect(createdType).toEqual(newTypeData);
            expect(Type.create).toHaveBeenCalledWith(newTypeData);
        });
    });

    describe('updateType', () => {
        it('should update an existing type', async () => {
            const typeId = '12345';
            const updatedData = { name: 'Updated Type' };
            Type.findByIdAndUpdate.mockResolvedValue({ ...mockTypes[0], ...updatedData });
            const updatedType = await typesService.updateType(typeId, updatedData);
            expect(updatedType).toEqual({ ...mockTypes[0], ...updatedData });
            expect(Type.findByIdAndUpdate).toHaveBeenCalledWith(typeId, updatedData, { new: true, runValidators: true });
        });

        it('should return null if type not found for update', async () => {
            const typeId = '54321';
            const updatedData = { name: 'Updated Type' };
            Type.findByIdAndUpdate.mockResolvedValue(null);
            const updatedType = await typesService.updateType(typeId, updatedData);
            expect(updatedType).toBeNull();
            expect(Type.findByIdAndUpdate).toHaveBeenCalledWith(typeId, updatedData, { new: true, runValidators: true });
        });
    });

    describe('deleteType', () => {
        it('should delete a type by id', async () => {
            const typeId = '12345';
            Type.findByIdAndDelete.mockResolvedValue(mockTypes[0]);
            const deletedType = await typesService.deleteType(typeId);
            expect(deletedType).toEqual(mockTypes[0]);
            expect(Type.findByIdAndDelete).toHaveBeenCalledWith(typeId);
        });

        it('should return null if type not found for deletion', async () => {
            const typeId = '54321';
            Type.findByIdAndDelete.mockResolvedValue(null);
            const deletedType = await typesService.deleteType(typeId);
            expect(deletedType).toBeNull();
            expect(Type.findByIdAndDelete).toHaveBeenCalledWith(typeId);
        });
    });
});