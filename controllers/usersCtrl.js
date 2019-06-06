// /api/v1/users
const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verification');

// INDEX users
router.get("/", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 2) {
    // don't return any passwords
    db.User.find({}, {password: 0}, (err, allUsers) => {
      if (err) return res.send(err);
      return res.json(allUsers);
    });
 } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
 }
});

// SHOW user
router.get("/:id", verifyToken, (req, res) => {
  if (req.decodedUser._id === req.params.id || req.decodedUser.role >= 2) {
    // don't return their password
    db.User.findById(req.params.id, {password: 0}, (err, foundUser) => {
      if (err) return res.send(err);
      return res.json({foundUser});
    })
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// UPDATE user
router.put("/:id", verifyToken, (req, res) => {
  if (req.decodedUser._id === req.params.id || req.decodedUser.role >= 2) {
    db.User.findByIdAndUpdate(
      req.params.id,
      req.body,
      // return the edited state of user, not the initial
      { new: true },
      (err, updatedUser) => {
        if (err) return res.send(err);
        return res.json(updatedUser);
      })
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

// DESTROY user
router.delete("/:id", verifyToken, (req, res) => {
  if (req.decodedUser._id === req.params.id || req.decodedUser.role >= 2) {
    db.User.findByIdAndDelete(req.params.id, {password: 0}, (err, deletedUser) => {
      if (err) return res.send(err);
      return res.json(deletedUser);
    });
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

module.exports = router;