const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    brand: String,
    category: String,
    price: Number,
    stock: Number,
    description: String,
    thumbnail: String
}, {
    timestamps: true
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
