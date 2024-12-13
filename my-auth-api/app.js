const express = require('express');
const mongoose = require('mongoose');
const Cart = require('./models/cartModel');
const Product = require('./models/productModel');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/testDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error al conectar a MongoDB:', err));

app.post('/carts/:cid/purchase', async (req, res) => {
  const cartId = req.params.cid;
  const cart = await Cart.findById(cartId).populate('items.productId');

  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  let insufficientStock = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    if (product.stock < item.quantity) {
      insufficientStock.push({
        productId: item.productId,
        quantityAvailable: product.stock,
      });
    } else {
      product.stock -= item.quantity;
      await product.save();
    }
  }

  if (insufficientStock.length > 0) {
    return res.status(400).json({
      message: 'Stock insuficiente',
      failedProducts: insufficientStock,
    });
  }

  return res.status(200).json({ message: 'Compra procesada correctamente' });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

module.exports = app;
