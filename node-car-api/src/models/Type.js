const { mongoose } = require('../db');

const TypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    year: { type: Number },
    specs: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Type', TypeSchema);