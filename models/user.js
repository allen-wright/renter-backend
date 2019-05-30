const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  isAdmin: Boolean,
  properties: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  maintenanceRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'MaintenanceRequest'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;