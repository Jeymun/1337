const Ticket = require('./models/ticketModel');

const createTicket = async (items, purchaserEmail, totalAmount) => {
  const newTicket = new Ticket({
    amount: totalAmount,
    purchaser: purchaserEmail
  });

  await newTicket.save();
  return newTicket;
};

module.exports = { createTicket };
