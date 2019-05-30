const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: String,
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  content: String
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;