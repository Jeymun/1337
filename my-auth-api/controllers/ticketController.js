
const Ticket = require('./models/ticketModel');

const createTicket = async (cart, purchaserEmail) => {
  const totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

  const newTicket = new Ticket({
    amount: totalAmount,
    purchaser: purchaserEmail
  });

  await newTicket.save();
  return newTicket;
};

module.exports = { createTicket };

