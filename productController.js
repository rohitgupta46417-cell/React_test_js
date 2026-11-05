const productModel = require('../models/productModel');

exports.addProduct = async (req, res) => {
    try {
        const new_product = new productModel(req.body);
        const result = await new_product.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: 'Unable to add product', error: err.message });
    }
};

exports.showProducts = async (req, res) => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Unable to fetch products', error: err.message });
    }
};

exports.showProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) return res.status(200).json(product);
        res.status(404).json({ message: 'Product not found' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid product id', error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Unable to update product', error: err.message });
    }
};

exports.delProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (product) return res.status(200).json({ message: 'Product deleted successfully' });
        res.status(404).json({ message: 'Product not found' });
    } catch (err) {
        res.status(400).json({ message: 'Unable to delete product', error: err.message });
    }
};
