// /src/models/ticketModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
});

// Middleware para autogenerar el código del ticket antes de guardar el documento
ticketSchema.pre('save', function(next) {
  if (!this.code) {
    this.code = `TICKET-${Date.now()}`; // Puedes personalizar el formato del código
  }
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
