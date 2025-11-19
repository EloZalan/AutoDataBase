import { jest } from '@jest/globals';

const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockCreate = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();

jest.unstable_mockModule('../../models/Brand.js', () => ({
    default: {
        find: mockFind,
        findById: mockFindById,
        create: mockCreate,
        findByIdAndUpdate: mockFindByIdAndUpdate,
        findByIdAndDelete: mockFindByIdAndDelete
    }
}));

const { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand } = await import('../../controllers/brandsController.js');

const mockBrands = [
    {
        _id: "1",
        name: "Toyota Motor Corporation",
        country: "Japan",
        founded: 1937,
        headquarters: "Toyota City, Aichi, Japan",
        specialties: ["Hybrid Technology", "Reliable Sedans", "Off-road Vehicles"],
        brands: ["Toyota", "Lexus"]
    },
    {
        _id: "2",
        name: "Volkswagen Group",
        country: "Germany",
        founded: 1937,
        headquarters: "Wolfsburg, Lower Saxony, Germany",
        specialties: ["Electric Vehicles", "European Engineering", "Hot Hatches"],
        brands: ["Volkswagen", "Audi", "Porsche", "Skoda", "SEAT"]
    }
];

describe('BrandsController', () => {
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

    describe('getAllBrands', () => {
        it('should return all brands with status 200', async () => {
            mockFind.mockResolvedValue(mockBrands);

            await getAllBrands(req, res);

            expect(mockFind).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockBrands);
            expect(res.status).not.toHaveBeenCalled();
        });

        it('should return 500 error when database fails', async () => {
            const errorMessage = 'Database connection failed';
            mockFind.mockRejectedValue(new Error(errorMessage));

            await getAllBrands(req, res);

            expect(mockFind).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch brands' });
        });
    });

    describe('getBrandById', () => {
        it('should return a brand by id with status 200', async () => {
            req.params.id = '1';
            mockFindById.mockResolvedValue(mockBrands[0]);

            await getBrandById(req, res);

            expect(mockFindById).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith(mockBrands[0]);
        });

        it('should return 404 when brand not found', async () => {
            req.params.id = '999';
            mockFindById.mockResolvedValue(null);

            await getBrandById(req, res);

            expect(mockFindById).toHaveBeenCalledWith('999');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Brand not found' });
        });

        it('should return 500 error when database fails', async () => {
            req.params.id = '1';
            mockFindById.mockRejectedValue(new Error('Database error'));

            await getBrandById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch brand' });
        });
    });

    describe('createBrand', () => {
        it('should create a new brand with status 201', async () => {
            const newBrand = {
                name: "BMW Group",
                country: "Germany",
                founded: 1916
            };
            const createdBrand = { _id: "3", ...newBrand };
            req.body = newBrand;
            mockCreate.mockResolvedValue(createdBrand);

            await createBrand(req, res);

            expect(mockCreate).toHaveBeenCalledWith(newBrand);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdBrand);
        });

        it('should return 400 error when validation fails', async () => {
            const invalidBrand = { country: "USA" }; 
            req.body = invalidBrand;
            const validationError = new Error('name is required');
            mockCreate.mockRejectedValue(validationError);

            await createBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: validationError.message });
        });
    });

    describe('updateBrand', () => {
        it('should update a brand and return it with status 200', async () => {

            req.params.id = '1';
            const updateData = { country: "Japan Updated" };
            req.body = updateData;
            const updatedBrand = { ...mockBrands[0], ...updateData };
            mockFindByIdAndUpdate.mockResolvedValue(updatedBrand);

            await updateBrand(req, res);


            expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
                '1',
                updateData,
                { new: true, runValidators: true }
            );
            expect(res.json).toHaveBeenCalledWith(updatedBrand);
        });

        it('should return 404 when brand not found', async () => {
            req.params.id = '999';
            req.body = { name: "Updated Name" };
            mockFindByIdAndUpdate.mockResolvedValue(null);

            
            await updateBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Brand not found' });
        });

        it('should return 400 error when validation fails', async () => {
            req.params.id = '1';
            req.body = { name: "" }; 
            const validationError = new Error('name cannot be empty');
            mockFindByIdAndUpdate.mockRejectedValue(validationError);

            await updateBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: validationError.message });
        });
    });

    describe('deleteBrand', () => {
        it('should delete a brand and return success message', async () => {
            req.params.id = '1';
            mockFindByIdAndDelete.mockResolvedValue(mockBrands[0]);

            await deleteBrand(req, res);

            expect(mockFindByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({ message: 'Brand deleted' });
        });

        it('should return 404 when brand not found', async () => {
            req.params.id = '999';
            mockFindByIdAndDelete.mockResolvedValue(null);

            await deleteBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Brand not found' });
        });

        it('should return 500 error when database fails', async () => {

            req.params.id = '1';
            mockFindByIdAndDelete.mockRejectedValue(new Error('Database error'));

            await deleteBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete brand' });
        });
    });
});