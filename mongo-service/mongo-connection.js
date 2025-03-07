const mongoose = require('mongoose');

async function connectToMongo() {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    if (!mongoUri) {
        throw new Error('MONGODB_URI environment variable not set');
    }
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
}

module.exports = { connectToMongo };