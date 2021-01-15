// /api/v1/users
const express = require("express");
const router = express.Router();
const db = require("../models");
const verifySession = require('../middleware/verification');

// SHOW user
// show a logged-in user their own information
router.get("/", verifySession, (req, res) => {
  return res.json(req.session.user);
});

// SHOW user
router.get("/:id", verifySession, (req, res) => {
  if (req.session.user._id === req.params.id || req.session.user.role >= 2) {
    // don't return their password
    db.User.findById(req.params.id, { password: 0 }, (err, foundUser) => {
      if (err) return res.send(err);
      return res.json({foundUser});
    })
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// INDEX users
// gets all users
router.get("/all", verifySession, (req, res) => {
  if (req.session.user.role >= 2) {
    // don't return any passwords
    db.User.find({}, { password: 0 }, (err, allUsers) => {
      if (err) return res.send(err);
      return res.json(allUsers);
    });
 } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
 }
});

// UPDATE user
router.put("/:id", verifySession, (req, res) => {
  if (req.session.user._id === req.params.id || req.session.user.role >= 2) {
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
// deletes user by ID
router.delete("/", verifySession, (req, res) => {
  db.User.findByIdAndDelete(req.session.user._id, { password: 0 }, (err, deletedUser) => {
    if (err) return res.status(404).json({ error: 'Could not find your user information.'});
    return res.json(deletedUser);
  });
});

// DESTROY user
router.delete("/:id", verifySession, (req, res) => {
  if (req.session.user._id === req.params.id || req.session.user.role >= 2) {
    db.User.findByIdAndDelete(req.params.id, { password: 0 }, (err, deletedUser) => {
      if (err) return res.send(err);
      return res.json(deletedUser);
    });
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

module.exports = router;