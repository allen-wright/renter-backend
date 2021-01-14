const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient({
  host: 'redis-server',
  port: '6379'
});
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// setup the environment
dotenv.config();
// setup port
const PORT = process.env.PORT || 5000;
// setup cors
const corsOptions = {
  origin: process.env.CORS_WHITELIST
}

const app = express();

// controllers
const authCtrl = require('./controllers/authCtrl');
const usersCtrl = require('./controllers/usersCtrl');
// const propertiesCtrl = require('./controllers/propertiesCtrl');
// const chatsCtrl = require('./controllers/chatsCtrl');
// const leaseTermsCtrl = require('./controllers/leaseTermsCtrl');
// const maintenanceRequestsCtrl = require('./controllers/maintenanceRequestsCtrl');

redisClient.on('connect', function() {
  console.log('Connected to Redis.');
});

redisClient.on('error', function(err) {
  console.log(`Redis error: ${err}`);
});
// middleware
app.use(morgan('combined'));
app.use(session({
  secret: process.env.REDIS_SECRET,
  // create new redis store.
  store: new redisStore(
    {
      host: 'redis-server',
      port: '6379',
      client: redisClient
    }),
  saveUninitialized: false,
  resave: false
}));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// web routes
app.get('/', function(req, res) {
  console.log(req.session);
  res.send('api page');
})

// api routes
app.use('/api/v1/auth', authCtrl);
app.use('/api/v1/users', usersCtrl);
// app.use('/api/v1/properties', propertiesCtrl);
// app.use('/api/v1/chats', chatsCtrl);
// app.use('/api/v1/leaseterms', leaseTermsCtrl);
// app.use('/api/v1/maintenancerequests', maintenanceRequestsCtrl);

// start server
app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}.`);
});