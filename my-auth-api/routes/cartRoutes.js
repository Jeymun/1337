const express = require('express');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const router = express.Router();

router.post('/:cid/purchase', async (req, res) => {
  const cartId = req.params.cid;
  const cart = await Cart.findById(cartId).populate('items.productId');
  if (!cart) {
    return res.status(404).send('Carrito no encontrado');
  }

  let failedProducts = [];
  for (let item of cart.items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      failedProducts.push({ productId: item.productId, message: 'Producto no encontrado' });
      continue;
    }

    if (product.stock < item.quantity) {
      failedProducts.push({ productId: product._id, message: 'Stock insuficiente' });
    } else {
      product.stock -= item.quantity;
      await product.save();
    }
  }

  if (failedProducts.length > 0) {
    return res.status(400).json({ failedProducts });
  }

  res.status(200).send('Compra procesada correctamente');
});

module.exports = router;
