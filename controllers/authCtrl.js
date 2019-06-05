const db = require('../models');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  console.log(req.body);
  const errors = [];
  // validation
  if (!req.body.name) errors.push({message: 'Please enter your name.'});
  if (!req.body.email) errors.push({message: 'Please enter your email.'});
  if (!req.body.password) errors.push({message: 'Please enter your password.'});
  if (req.body.password !== req.body.password2) errors.push({message: 'Your passwords do not match.'});
  // if errors exist, end and return those errors
  if (errors.length > 0) return res.status(400).send(errors);
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
              name: req.body.name,
              email: req.body.email,
              password: hash
            }, (err, newUser) => {
              // if successful, create JWT
              const token = jwt.sign(
                {
                  name: newUser.name,
                  email: newUser.email,
                  _id: newUser._id
                },
                process.env.JWT_SECRET_KEY,
                {
                  expiresIn: "30 days"
                },
              );
                res.status(200).json({
                  message: 'User Created',
                  newUser,
                  token
                })
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
              name: users[0].name,
              email: users[0].email,
              _id: users[0]._id
            },
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

module.exports = router;