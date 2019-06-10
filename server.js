const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// setup the environment
dotenv.config();
// setup port
const PORT = process.env.PORT || 4000;
// setup cors
const corsOptions = {
  origin: process.env.CORS_WHITELIST
}

const app = express();

// controllers
const authCtrl = require('./controllers/authCtrl');
const usersCtrl = require('./controllers/usersCtrl');
const propertiesCtrl = require('./controllers/propertiesCtrl');
const chatsCtrl = require('./controllers/chatsCtrl');
const leaseTermsCtrl = require('./controllers/leaseTermsCtrl');
const maintenanceRequestsCtrl = require('./controllers/maintenanceRequestsCtrl');

// middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// web routes
app.get('/', (req, res) => {
  res.send('api page');
})

// api routes
app.use('/api/v1/auth', authCtrl);
app.use('/api/v1/users', usersCtrl);
app.use('/api/v1/properties', propertiesCtrl);
app.use('/api/v1/chats', chatsCtrl);
app.use('/api/v1/leaseterms', leaseTermsCtrl);
app.use('/api/v1/maintenancerequests', maintenanceRequestsCtrl);

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));