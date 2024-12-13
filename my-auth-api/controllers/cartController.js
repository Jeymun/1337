const Cart = require('../models/cartModel');
const Product = require('./models/productModel');
const TicketService = require('../services/ticketService');

const finalizePurchase = async (req, res) => {
  const cartId = req.params.cid;
  const userId = req.user.id;
  const cart = await Cart.findOne({ _id: cartId, user: userId }).populate('items.product');

  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  let failedProducts = [];
  let successfulItems = [];
  let totalAmount = 0;

  for (let item of cart.items) {
    const product = item.product;

    if (product.stock < item.quantity) {
      failedProducts.push(product._id);
    } else {
      product.stock -= item.quantity;
      await product.save();
      totalAmount += product.price * item.quantity;
      successfulItems.push(item);
    }
  }

  if (failedProducts.length === cart.items.length) {
    return res.status(400).json({ message: 'No se puede procesar la compra debido a falta de stock.', failedProducts });
  }

  const purchaserEmail = req.user.email;
  const ticket = await TicketService.createTicket(successfulItems, purchaserEmail, totalAmount);

  const remainingItems = cart.items.filter(item => failedProducts.includes(item.product._id));

  await Cart.updateOne({ _id: cartId }, { $set: { items: remainingItems } });

  return res.json({ message: 'Compra finalizada con éxito', ticket, failedProducts });
};

module.exports = { finalizePurchase };
