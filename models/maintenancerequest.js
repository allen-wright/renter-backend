const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaintenanceRequestSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  request: String,
  status: String,
  completionEstimate: Date,
  completionDate: Date,
  notes: String
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);

module.exports = MaintenanceRequest;