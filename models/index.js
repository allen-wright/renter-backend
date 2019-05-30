const mongoose = require('mongoose');
const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/renter';

mongoose.connect(DB_URL, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {console.log('MongoDB connected...')})
  .catch((err) => console.log(err));

  // module.exports = {
  //  User: require('./user'),
  //  City: require('./city'),
  //  Post: require('./post')
  // };