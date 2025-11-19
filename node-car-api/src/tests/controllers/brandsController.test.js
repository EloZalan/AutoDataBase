import { jest } from '@jest/globals';

// Mock the Brand model BEFORE importing the controller
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

// Import controller AFTER mocking
const { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand } = await import('../../controllers/brandsController.js');

// Mock data from carBrands.json
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
        // Reset mocks before each test
        jest.clearAllMocks();
        
        // Setup request and response objects
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
            // Arrange
            mockFind.mockResolvedValue(mockBrands);

            // Act
            await getAllBrands(req, res);

            // Assert
            expect(mockFind).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockBrands);
            expect(res.status).not.toHaveBeenCalled();
        });

        it('should return 500 error when database fails', async () => {
            // Arrange
            const errorMessage = 'Database connection failed';
            mockFind.mockRejectedValue(new Error(errorMessage));

            // Act
            await getAllBrands(req, res);

            // Assert
            expect(mockFind).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch brands' });
        });
    });

    describe('getBrandById', () => {
        it('should return a brand by id with status 200', async () => {
            // Arrange
            req.params.id = '1';
            mockFindById.mockResolvedValue(mockBrands[0]);

            // Act
            await getBrandById(req, res);

            // Assert
            expect(mockFindById).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith(mockBrands[0]);
        });

        it('should return 404 when brand not found', async () => {
            // Arrange
            req.params.id = '999';
            mockFindById.mockResolvedValue(null);

            // Act
            await getBrandById(req, res);

            // Assert
            expect(mockFindById).toHaveBeenCalledWith('999');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Brand not found' });
        });

        it('should return 500 error when database fails', async () => {
            // Arrange
            req.params.id = '1';
            mockFindById.mockRejectedValue(new Error('Database error'));

            // Act
            await getBrandById(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch brand' });
        });
    });

    describe('createBrand', () => {
        it('should create a new brand with status 201', async () => {
            // Arrange
            const newBrand = {
                name: "BMW Group",
                country: "Germany",
                founded: 1916
            };
            const createdBrand = { _id: "3", ...newBrand };
            req.body = newBrand;
            mockCreate.mockResolvedValue(createdBrand);

            // Act
            await createBrand(req, res);

            // Assert
            expect(mockCreate).toHaveBeenCalledWith(newBrand);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdBrand);
        });

        it('should return 400 error when validation fails', async () => {
            // Arrange
            const invalidBrand = { country: "USA" }; // missing required name
            req.body = invalidBrand;
            const validationError = new Error('name is required');
            mockCreate.mockRejectedValue(validationError);

            // Act
            await createBrand(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: validationError.message });
        });
    });

    describe('updateBrand', () => {
        it('should update a brand and return it with status 200', async () => {
            // Arrange
            req.params.id = '1';
            const updateData = { country: "Japan Updated" };
            req.body = updateData;
            const updatedBrand = { ...mockBrands[0], ...updateData };
            mockFindByIdAndUpdate.mockResolvedValue(updatedBrand);

            // Act
            await updateBrand(req, res);

            // Assert
            expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
                '1',
                updateData,
                { new: true, runValidators: true }
            );
            expect(res.json).toHaveBeenCalledWith(updatedBrand);
        });

        it('should return 404 when brand not found', async () => {
            // Arrange
            req.params.id = '999';
            req.body = { name: "Updated Name" };
            mockFindByIdAndUpdate.mockResolvedValue(null);

            // Act
            await updateBrand(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Brand not found' });
        });

        it('should return 400 error when validation fails', async () => {
            // Arrange
            req.params.id = '1';
            req.body = { name: "" }; // invalid name
            const validationError = new Error('name cannot be empty');
            mockFindByIdAndUpdate.mockRejectedValue(validationError);

            // Act
            await updateBrand(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: validationError.message });
        });
    });

    describe('deleteBrand', () => {
        it('should delete a brand and return success message', async () => {
            // Arrange
            req.params.id = '1';
            mockFindByIdAndDelete.mockResolvedValue(mockBrands[0]);

            // Act
            await deleteBrand(req, res);

            // Assert
            expect(mockFindByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({ message: 'Brand deleted' });
        });

        it('should return 404 when brand not found', async () => {
            // Arrange
            req.params.id = '999';
            mockFindByIdAndDelete.mockResolvedValue(null);

            // Act
            await deleteBrand(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Brand not found' });
        });

        it('should return 500 error when database fails', async () => {
            // Arrange
            req.params.id = '1';
            mockFindByIdAndDelete.mockRejectedValue(new Error('Database error'));

            // Act
            await deleteBrand(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete brand' });
        });
    });
});