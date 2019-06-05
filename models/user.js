const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  role:   {
    type: Number,
    required: true ,
    select: false,
    default: 1
  },
  password: {
    type: String,
    required: true ,
    select: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ,
  },
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