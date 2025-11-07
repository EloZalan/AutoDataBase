const { mongoose } = require('../db');

const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    founded: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Brand', BrandSchema);