import mongoose from 'mongoose';
import Type from '../../../src/models/Type'; // Adjust the path as necessary

describe('Type Model', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Type.deleteMany({});
    });

    it('should create a valid Type', async () => {
        const typeData = { name: 'Sedan', brand: 'Toyota' }; // Adjust according to your schema
        const type = await Type.create(typeData);
        expect(type).toHaveProperty('_id');
        expect(type.name).toBe(typeData.name);
        expect(type.brand).toBe(typeData.brand);
    });

    it('should not create a Type without a name', async () => {
        const typeData = { brand: 'Toyota' }; // Missing name
        await expect(Type.create(typeData)).rejects.toThrow();
    });

    it('should not create a Type with an invalid brand', async () => {
        const typeData = { name: 'Sedan', brand: 'InvalidBrand' }; // Adjust according to your validation
        await expect(Type.create(typeData)).rejects.toThrow();
    });

    it('should retrieve a Type by ID', async () => {
        const typeData = { name: 'SUV', brand: 'Honda' };
        const type = await Type.create(typeData);
        const foundType = await Type.findById(type._id);
        expect(foundType.name).toBe(typeData.name);
    });

    it('should update a Type', async () => {
        const typeData = { name: 'Hatchback', brand: 'Ford' };
        const type = await Type.create(typeData);
        const updatedData = { name: 'Updated Hatchback' };
        const updatedType = await Type.findByIdAndUpdate(type._id, updatedData, { new: true });
        expect(updatedType.name).toBe(updatedData.name);
    });

    it('should delete a Type', async () => {
        const typeData = { name: 'Coupe', brand: 'BMW' };
        const type = await Type.create(typeData);
        await Type.findByIdAndDelete(type._id);
        const deletedType = await Type.findById(type._id);
        expect(deletedType).toBeNull();
    });
});