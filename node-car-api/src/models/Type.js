import mongoose from 'mongoose';

const TypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    year: { type: Number },
    specs: { type: Object }
}, { timestamps: true });

export default mongoose.model('Type', TypeSchema);