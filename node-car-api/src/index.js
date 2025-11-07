import express from 'express';
import brandsRoutes from './routes/brands.js';
import typesRoutes from './routes/types.js';
import * as db from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/brands', brandsRoutes);
app.use('/api/types', typesRoutes);

db.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start server due to DB error', err);
});