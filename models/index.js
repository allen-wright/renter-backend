const mongoose = require('mongoose');
const DB_URL = process.env.MONGO_URI || 'mongodb://mongo-server:27017/renter';
const RETRY_TIMEOUT = 3000;

mongoose.connect(DB_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    keepAlive: 30000,
  })
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
