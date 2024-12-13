const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
