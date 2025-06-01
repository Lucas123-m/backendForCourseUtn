require('dotenv').config();
const express = require('express');
const productRouter = require('./src/routes/product.routes');

const app = express();
app.use(express.json());

app.use('/products', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});