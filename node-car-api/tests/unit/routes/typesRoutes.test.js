import request from 'supertest';
import app from '../../../src/app'; // Adjust the path to your app
import Type from '../../../src/models/Type';
import { connect, disconnect } from '../../../src/utils/db'; // Adjust the path to your db utility

describe('Types Routes', () => {
    beforeAll(async () => {
        await connect();
    });

    afterAll(async () => {
        await disconnect();
    });

    beforeEach(async () => {
        await Type.deleteMany({});
    });

    it('should fetch all types', async () => {
        const type = await Type.create({ name: 'Sedan', brand: 'Toyota' });

        const response = await request(app).get('/api/types');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('_id', type._id.toString());
        expect(response.body[0]).toHaveProperty('name', type.name);
    });

    it('should fetch a type by ID', async () => {
        const type = await Type.create({ name: 'SUV', brand: 'Honda' });

        const response = await request(app).get(`/api/types/${type._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', type._id.toString());
        expect(response.body).toHaveProperty('name', type.name);
    });

    it('should create a new type', async () => {
        const newType = { name: 'Coupe', brand: 'Ford' };

        const response = await request(app).post('/api/types').send(newType);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name', newType.name);
    });

    it('should update an existing type', async () => {
        const type = await Type.create({ name: 'Hatchback', brand: 'Volkswagen' });
        const updatedType = { name: 'Updated Hatchback' };

        const response = await request(app).put(`/api/types/${type._id}`).send(updatedType);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', type._id.toString());
        expect(response.body).toHaveProperty('name', updatedType.name);
    });

    it('should delete a type', async () => {
        const type = await Type.create({ name: 'Convertible', brand: 'BMW' });

        const response = await request(app).delete(`/api/types/${type._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Type deleted');

        const deletedType = await Type.findById(type._id);
        expect(deletedType).toBeNull();
    });
});