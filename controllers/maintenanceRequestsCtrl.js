// /api/v1/maintenanceRequests
const express = require("express");
const router = express.Router();
const db = require("../models");
const verifyToken = require('../middleware/verification');

// SHOW maintenance requests
// gets current user's maintenance requests via the ID from their token
router.get("/", verifyToken, (req, res) => {
  db.MaintenanceRequest.find({senderId: req.decodedUser._id}, (err, foundMaintenanceRequests) => {
    if (err) return res.status(404).json({ error: 'Could not find your maintenance requests.'});
    return res.json(foundMaintenanceRequests);
  })
});

// SHOW maintenance request
// requires site owner or admin of the property
router.get("/:id", verifyToken, (req, res) => {
  db.MaintenanceRequest.findById(req.params.id, (err, foundMaintenanceRequests) => {
    if (err) return res.status(404).json({ error: 'Could not find your maintenance requests.'});
    if (req.decodedUser.role >= 3 ||
        req.decodedUser.role === 2 && req.decodedUser.property === foundMaintenanceRequests.property) {
      return res.json({foundMaintenanceRequests});
    } else {
      return res.status(401).json({ error: 'You are not authorized to do that.'});
    }
  })
});

// INDEX maintenance requests
// gets all maintenance requests for the property
// requires the user be an admin of the property
router.get("/all", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 2) {
    db.MaintenanceRequest.find({property: req.decodedUser.property}, (err, allMaintenanceRequests) => {
      if (err) return res.status(500).json({ error: 'Error retrieving all maintenance requests. Please try again.'});
      return res.json(allMaintenanceRequests);
    });
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// CREATE maintenance requests
router.post('/', verifyToken, (req, res) => {
  db.MaintenanceRequest.create(req.body, (err, newMaintenanceRequest) => {
    if (err) return res.status(500).json({ error: 'Error creating maintenance request. Please try again.'});
    return res.json(newMaintenanceRequest);
  })
});

// UPDATE maintenance requests
// requires the user be an admin of the property
router.put("/:id", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 2) {
    db.MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      // return the edited state of user, not the initial
      { new: true },
      (err, updatedMaintenanceRequest) => {
        if (err) return res.send(err);
        return res.json(updatedMaintenanceRequest);
      })
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

// DESTROY maintenance requests
// requires the user be an admin of the property
router.delete("/:id", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 2) {
    db.MaintenanceRequest.findByIdAndDelete(req.params.id, (err, deletedMaintenanceRequest) => {
      if (err) return res.send(err);
      return res.json(deletedMaintenanceRequest);
    });
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

module.exports = router;