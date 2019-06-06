const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  name: String,
  location: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tenants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  maintenanceRequests: [{
    type: Schema.Types.ObjectId,
    ref: 'maintenanceRequest'
  }],
  leaseTerms: {
    type: Schema.Types.ObjectId,
    ref: 'leaseTerms'
  }
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;