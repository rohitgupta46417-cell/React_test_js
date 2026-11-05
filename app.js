const express = require('express');
const cors = require('cors');
const connectMongo = require('./db/db_config');
const routes = require('./routes/productRoutes');

const app = express();
connectMongo();

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use('/product', routes);

app.listen(4000, () => {
    console.log('Product Manager is running....');
});
