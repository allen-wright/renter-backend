const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaintenanceRequestSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  },
  request: String,
  status: String,
  completionEstimate: Date,
  completionDate: Date,
  notes: String
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);

module.exports = MaintenanceRequest;