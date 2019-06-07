// /api/v1/leaseTerms
const express = require("express");
const router = express.Router();
const db = require("../models");
const verifyToken = require('../middleware/verification');

// SHOW lease terms
// gets current user's lease terms via the ID from their token
router.get("/", verifyToken, (req, res) => {
  db.LeaseTerms.find(req.decodedUser._id, (err, foundLeaseTerms) => {
    if (err) return res.status(404).json({ error: 'Could not find your profile.'});
    return res.json(foundLeaseTerms);
  })
});

// SHOW lease terms
router.get("/:id", verifyToken, (req, res) => {
  if (req.decodedUser._id === req.params.id || req.decodedUser.role >= 2) {
    // don't return their password
    db.User.findById(req.params.id, {password: 0}, (err, foundLeaseTerms) => {
      if (err) return res.send(err);
      return res.json({foundLeaseTerms});
    })
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// INDEX lease terms
// gets all lease terms for the user's property
// requires the user be an admin of that property
router.get("/all", verifyToken, (req, res) => {
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

// CREATE lease terms
// requires the user be an admin of the property
router.post('/', verifyToken, (req, res) => {

});

// UPDATE lease terms
// requires the user be an admin of the property
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

// DESTROY lease terms
// requires the user be an admin of the property
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

// CREATE sections
// creates a new section in a lease term
// requires the user be an admin of the property
router.post("/:id/sections", verifyToken, (req, res) => {
  db.LeaseTerms.find(req.decodedUser._id, (err, foundLeaseTerms) => {
    if (err) return res.status(404).json({ error: 'Could not find your profile.'});
    return res.json(foundLeaseTerms);
  })
});

// UPDATE sections
// updates a section in a lease term
// requires the user be an admin of the property
router.update("/:id/sections/:id", verifyToken, (req, res) => {
  db.LeaseTerms.find(req.decodedUser._id, (err, foundLeaseTerms) => {
    if (err) return res.status(404).json({ error: 'Could not find your profile.'});
    return res.json(foundLeaseTerms);
  })
});

// DELETE sections
// deletes a section in a lease term
// requires the user be an admin of the property
router.delete("/:id/sections/:id", verifyToken, (req, res) => {
  db.LeaseTerms.find(req.decodedUser._id, (err, foundLeaseTerms) => {
    if (err) return res.status(404).json({ error: 'Could not find your profile.'});
    return res.json(foundLeaseTerms);
  })
});

module.exports = router;