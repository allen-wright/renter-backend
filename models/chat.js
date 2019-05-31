const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  messages: [{
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
  }],
  maintenanceRequest: {
    type: Schema.Types.ObjectId,
    ref: 'MaintenanceRequest'
  }
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;