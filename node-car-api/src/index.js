const express = require('express');
const brandsRoutes = require('./routes/brands');
const typesRoutes = require('./routes/types');
const db = require('./db');

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