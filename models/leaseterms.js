const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaseTermsSchema = new Schema({
  sections: [{
    name: String,
    order: Number,
    content: String
  }],
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
});

const LeaseTerms = mongoose.model('LeaseTerms', LeaseTermsSchema);

module.exports = LeaseTerms;