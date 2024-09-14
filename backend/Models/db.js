//db.js
    const mongoose = require('mongoose');

    const mongo_url = process.env.MONGO_CONN;
    
    mongoose.connect(mongo_url, {
        useNewUrlParser: true,  // Use the new MongoDB connection string parser
        useUnifiedTopology: true // Use the new MongoDB engine's topology engine
    })
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch((err) => {
        console.error('MongoDB Connection Error: ', err);
    });
    
    