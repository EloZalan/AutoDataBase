import { jest } from '@jest/globals';

const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockCreate = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();

jest.unstable_mockModule('../../models/Type.js', () => ({
    default: {
        find: mockFind,
        findById: mockFindById,
        create: mockCreate,
        findByIdAndUpdate: mockFindByIdAndUpdate,
        findByIdAndDelete: mockFindByIdAndDelete
    }
}));

const { getAllTypes, getTypeById, createType, updateType, deleteType } = await import('../../controllers/typesController.js');

const mockTypes = [
    {
        _id: "1",
        brand: "Toyota",
        model: "Supra GR",
        type: "Sports Coupe",
        engine: "3.0L Turbocharged Inline-6",
        horsepower: 382,
        drive: "RWD",
        features: ["Adaptive suspension", "Aggressive styling", "BMW platform"],
        audience: ["Enthusiasts", "JDM fans"],
        special: "Modern revival of the legendary Supra"
    },
    {
        _id: "2",
        brand: "Volkswagen",
        model: "Golf GTI",
        type: "Hot Hatchback",
        engine: "2.0L Turbocharged I4",
        horsepower: 241,
        drive: "FWD",
        features: ["Sport-tuned suspension", "Digital cockpit", "Manual/DSG options"],
        audience: ["Performance hatch lovers", "Young drivers"],
        special: "Iconic hot hatch with daily usability and fun handling"
    }
];

describe('TypesController', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        
        req = {
            params: {},
            body: {}
        };
        
        res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis()
        };
    });

    describe('getAllTypes', () => {
        it('should return all types with populated brand', async () => {
            const mockPopulate = jest.fn().mockResolvedValue(mockTypes);
            mockFind.mockReturnValue({ populate: mockPopulate });

            await getAllTypes(req, res);

            expect(mockFind).toHaveBeenCalledTimes(1);
            expect(mockPopulate).toHaveBeenCalledWith('brand');
            expect(res.json).toHaveBeenCalledWith(mockTypes);
        });

        it('should return 500 error when database fails', async () => {

            const mockPopulate = jest.fn().mockRejectedValue(new Error('Database error'));
            mockFind.mockReturnValue({ populate: mockPopulate });

            await getAllTypes(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch types' });
        });
    });

    describe('getTypeById', () => {
        it('should return a type by id with populated brand', async () => {

            req.params.id = '1';
            const mockPopulate = jest.fn().mockResolvedValue(mockTypes[0]);
            mockFindById.mockReturnValue({ populate: mockPopulate });

            await getTypeById(req, res);

            expect(mockFindById).toHaveBeenCalledWith('1');
            expect(mockPopulate).toHaveBeenCalledWith('brand');
            expect(res.json).toHaveBeenCalledWith(mockTypes[0]);
        });

        it('should return 404 when type not found', async () => {

            req.params.id = '999';
            const mockPopulate = jest.fn().mockResolvedValue(null);
            mockFindById.mockReturnValue({ populate: mockPopulate });

            
            await getTypeById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Type not found' });
        });

        it('should return 500 error when database fails', async () => {

            req.params.id = '1';
            const mockPopulate = jest.fn().mockRejectedValue(new Error('Database error'));
            mockFindById.mockReturnValue({ populate: mockPopulate });

            await getTypeById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch type' });
        });
    });

    describe('createType', () => {
        it('should create a new type with status 201', async () => {

            const newType = {
                brand: "Toyota",
                model: "Camry",
                type: "Sedan",
                year: 2024
            };
            const createdType = { _id: "3", ...newType };
            req.body = newType;
            mockCreate.mockResolvedValue(createdType);

            await createType(req, res);

            expect(mockCreate).toHaveBeenCalledWith(newType);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdType);
        });

        it('should return 400 error when validation fails', async () => {

            const invalidType = { type: "SUV" }; 
            req.body = invalidType;
            const validationError = new Error('name is required');
            mockCreate.mockRejectedValue(validationError);

            await createType(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: validationError.message });
        });
    });

    describe('updateType', () => {
        it('should update a type and return it', async () => {

            req.params.id = '1';
            const updateData = { horsepower: 400 };
            req.body = updateData;
            const updatedType = { ...mockTypes[0], ...updateData };
            mockFindByIdAndUpdate.mockResolvedValue(updatedType);

            await updateType(req, res);

            expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
                '1',
                updateData,
                { new: true, runValidators: true }
            );
            expect(res.json).toHaveBeenCalledWith(updatedType);
        });

        it('should return 404 when type not found', async () => {

            req.params.id = '999';
            req.body = { model: "Updated Model" };
            mockFindByIdAndUpdate.mockResolvedValue(null);

            await updateType(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Type not found' });
        });

        it('should return 400 error when validation fails', async () => {

            req.params.id = '1';
            req.body = { name: "" };
            const validationError = new Error('name cannot be empty');
            mockFindByIdAndUpdate.mockRejectedValue(validationError);

            await updateType(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: validationError.message });
        });
    });

    describe('deleteType', () => {
        it('should delete a type and return success message', async () => {

            req.params.id = '1';
            mockFindByIdAndDelete.mockResolvedValue(mockTypes[0]);

            await deleteType(req, res);

            expect(mockFindByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({ message: 'Type deleted' });
        });

        it('should return 404 when type not found', async () => {

            req.params.id = '999';
            mockFindByIdAndDelete.mockResolvedValue(null);

            
            await deleteType(req, res);


            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Type not found' });
        });

        it('should return 500 error when database fails', async () => {

            req.params.id = '1';
            mockFindByIdAndDelete.mockRejectedValue(new Error('Database error'));

            await deleteType(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete type' });
        });
    });
});