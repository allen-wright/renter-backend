const db = require('../models');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  console.log(req.body);
    // check to see if email is already in db
    db.User.find({email: req.body.email})
      .exec()
      .then( user => {
        // find if user with this email already exists
        if (user.length >= 1) {
          return res.status(409).json({
            message: "email already exists"
          })
        } else {
          // hash password
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
              console.log("Error hashing password: ", err);
              res.status(200).json({error: err})
            } else {
              // create User if hash successful
              db.User.create({
                email: req.body.email,
                password: hash
              }, {password: 0}, (err, result) => {
                // if successful, create JWT
                jwt.sign(
                  {result},
                  process.env.JWT_SECRET_KEY,
                  (err, signedJwt) => {
                  res.status(200).json({
                    message: 'User Created',
                    result,
                    signedJwt
                  })
                });
              })
            }
          })
        }
      })
      .catch( err => {
        console.log(err);
        res.status(500).json({err})
      })
});

router.post('/login', (req, res) => {
  // find user
  db.User.find({email: req.body.email})
    .select('+password')
    .exec()
    .then( users => {
      // if no user exists
      if(users.length < 1) {
        return res.status(401).json({
          message: "Email/Password incorrect"
        })
      }
      // compare hashes
      bcrypt.compare(req.body.password, users[0].password, (err, match) => {
        if (err) { console.log(err);return res.status(500).json({err}) }
        if (match) {
          // create JWT
          const token = jwt.sign(
            {
              // add some identifying information
              email: users[0].email,
              _id: users[0]._id
            },
            // add our super secret key (which should be hidden, not plaintext like this)
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "30 days"
            },
          );
          // send success back to user, along with a token.
          return res.status(200).json(
            {
              message: 'Auth successful',
              token
            }
          )
        // the password provided does not match the password on file.
        } else {
          res.status(401).json({message: "Email/Password incorrect"})
        }
      })
    })
    .catch( err => {
      res.status(500).json({err})
    })
});

// router.post('/logout', (req, req) => {

// });

module.exports = router;