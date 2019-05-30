const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: Number,
  method: String,
  date: {
    type: Date,
    default: Date.now
  },
  type: String
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;