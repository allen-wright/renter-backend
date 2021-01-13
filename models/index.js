const mongoose = require('mongoose');
const DB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/renter';

mongoose.connect(DB_URL, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {console.log('MongoDB connected...')})
  .catch((err) => console.log(err));

  module.exports = {
   User: require('./user'),
   Property: require('./property'),
   Chat: require('./chat'),
   Payment: require('./payment'),
   MaintenanceRequest: require('./maintenancerequest'),
   LeaseTerms: require('./leaseterms')
  };