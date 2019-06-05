// /api/v1/users
const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

// INDEX users
router.get("/", (req, res) => {
  // don't return any passwords
  db.User.find({}, {password: 0}, (err, allUsers) => {
    if (err) return res.send(err);
    return res.json(allUsers);
  });
});

// SHOW user
router.get("/:id", (req, res) => {
  // don't return their password
  db.User.findById(req.params.id, {password: 0}, (err, foundUser) => {
    if (err) return res.send(err);
    return res.json({foundUser});
  });
});

// UPDATE user
router.put("/:id", (req, res) => {
  if (req.session.loggedIn && req.session.currentUser.id === req.params.id) {
    db.User.findByIdAndUpdate(
      req.params.id,
      req.body,
      // return the edited state of user, not the initial
      { new: true },
      (err, updatedUser) => {
        if (err) return res.send(err);
        return res.json(updatedUser);
      }
    );
  } else {
    return res.status(401).json({ error: "You are not authorized to update this user." });
  }
});

// DESTROY user
router.delete("/:id", verifyToken, (req, res) => {
  console.log(req.decodedToken._id);
  if (req.decodedToken._id === req.params.id) {
    db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
      if (err) return res.send(err);
      return res.json(deletedUser);
    });
  } else {
    return res.json({error: "No user found with that ID."})
  }
});

module.exports = router;