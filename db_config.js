const mongoose = require('mongoose');

const connectMongo = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/product_manager')
        .then(() => console.log('Connected....'))
        .catch((err) => console.log('MongoDB connection error:', err.message));
};

module.exports = connectMongo;
