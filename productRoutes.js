const express = require('express');
const {
    addProduct, showProducts, updateProduct, showProduct, delProduct
} = require('../controllers/productController');

const routes = express.Router();

routes.post('/add', addProduct);
routes.get('/', showProducts);
routes.put('/:id', updateProduct);
routes.get('/product/:id', showProduct);
routes.delete('/:id', delProduct);

module.exports = routes;
