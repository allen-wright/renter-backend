const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  tenant: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  lastMessageDate: {
    type: Date,
    default: Date.now
  },
  maintenanceRequest: {
    type: Schema.Types.ObjectId,
    ref: 'MaintenanceRequest'
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  messages: [{
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    },
    content: String
  }]
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;