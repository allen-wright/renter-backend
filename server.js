const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

const app = express();

// controllers
const authCtrl = require('./controllers/authCtrl');
const usersCtrl = require('./controllers/usersCtrl');

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// web routes
app.get('/', (req, res) => {
  res.send('api page');
})

// api routes


// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));