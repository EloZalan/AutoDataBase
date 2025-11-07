const express = require('express');
const bodyParser = require('body-parser');
const brandsRoutes = require('./routes/brands');
const typesRoutes = require('./routes/types');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/brands', brandsRoutes);
app.use('/api/types', typesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});