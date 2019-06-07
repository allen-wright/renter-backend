// /api/v1/properties
const express = require("express");
const router = express.Router();
const db = require("../models");
const verifyToken = require('../middleware/verification');

// SHOW property
// gets property via the admin's property field from their token
router.get("/", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 2) {
    db.Property.findById(req.decodedUser.property, (err, foundProperty) => {
      if (err) return res.status(404).json({ error: 'Could not find the property.'});
      return res.json(foundProperty);
    })
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// SHOW property
// requires the user be the site owner
router.get("/:id", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Property.findById(req.params.id, (err, foundProperty) => {
      if (err) return res.status(404).json({ error: 'Could not find the property.'});
      return res.json(foundProperty);
    })
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// INDEX properties
// gets all properties
// requires the user be the site owner
router.get("/all", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Property.find({}, (err, allProperties) => {
      if (err) return res.send(err);
      return res.json(allProperties);
    });
 } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
 }
});

// CREATE property
// requires the user be the site owner
router.post('/', (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Property.create(req.body, (err, newProperty) => {
      if (err) return res.send(err);
      return res.json(newProperty);
    });
 } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
 }
});

// UPDATE property
// requires the user be an admin of the property, or the site owner
router.put("/:id", verifyToken, (req, res) => {
  if (req.decodedUser.role === 2 && req.params.id === req.decodedUser.property
    || req.decodedUser.role >= 3) {
    db.Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      // return the edited state of user, not the initial
      { new: true },
      (err, updatedProperty) => {
        if (err) return res.send(err);
        return res.json(updatedProperty);
      })
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

// DESTROY property
// requires the user be the site owner
router.delete("/:id", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Property.findByIdAndDelete(req.params.id, (err, deletedProperty) => {
      if (err) return res.send(err);
      return res.json(deletedProperty);
    });
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

module.exports = router;