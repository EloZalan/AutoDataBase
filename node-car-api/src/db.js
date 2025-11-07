import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://m001-student:student01@cluster0.fhwvjka.mongodb.net/auto';

export async function connect() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to MongoDB at ${MONGO_URI}`);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

export { mongoose };