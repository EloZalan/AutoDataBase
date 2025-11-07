import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    founded: { type: Number }
}, { timestamps: true });

export default mongoose.model('Brand', BrandSchema, 'autok');