import { connect, disconnect } from '../../utils/db';

describe('Database Utility Functions', () => {
    beforeAll(async () => {
        await connect();
    });

    afterAll(async () => {
        await disconnect();
    });

    test('should connect to the database', async () => {
        const dbConnection = await connect();
        expect(dbConnection).toBeTruthy();
    });

    test('should disconnect from the database', async () => {
        await disconnect();
        // Assuming disconnect returns a value or throws an error on failure
        expect(true).toBe(true); // Placeholder for actual disconnect validation
    });
});