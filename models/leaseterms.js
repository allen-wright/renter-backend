const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaseTermsSchema = new Schema({
  sections: [],
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
});

const LeaseTerms = mongoose.model('LeaseTerms', LeaseTermsSchema);

module.exports = LeaseTerms;