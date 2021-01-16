// /api/v1/leaseTerms
const express = require("express");
const router = express.Router();
const db = require("../models");
const verifySession = require('../middleware/verification');

// SHOW lease terms
// gets current user's lease terms via the ID from their token
router.get("/", verifySession, (req, res) => {
  db.LeaseTerms.findOne({ property: req.session.user.property }, (err, foundLeaseTerms) => {
    if (err) return res.status(404).json({ error: 'Could not find your lease terms.'});
    return res.json(foundLeaseTerms);
  })
});

// INDEX lease terms
// gets all lease terms
// requires the user be site owner
router.get("/all", verifySession, (req, res) => {
  if (req.session.user.role >= 3) {
    db.LeaseTerms.find({}, (err, allLeaseTerms) => {
      if (err) return res.status(500).json({ error: 'Error retrieving all lease terms. Please try again.'});
      return res.json(allLeaseTerms);
    });
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// SHOW lease terms
// requires site owner or admin of the property
router.get("/:id", verifySession, (req, res) => {
  db.LeaseTerms.findById(req.params.id, (err, foundLeaseTerms) => {
    if (err) return res.status(404).json({ error: 'Could not find your lease terms.'});
    if (req.session.user.role >= 3 ||
        req.session.user.role >= 2 && req.session.user.property === foundLeaseTerms.property) {
      return res.json({foundLeaseTerms});
    } else {
      return res.status(401).json({ error: 'You are not authorized to do that.'});
    }
  })
});

// CREATE lease terms
// requires the user be an admin, or the site owner
router.post('/', verifySession, (req, res) => {
  if (req.session.user.role >= 2) {
    db.LeaseTerms.create(req.body, (err, newLeaseTerms) => {
      if (err) return res.status(500).json({ error: 'Error creating lease terms. Please try again.'});
      return res.json(newLeaseTerms);
    })
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// UPDATE lease terms
// requires the user be an admin of the property
router.put("/:id", verifySession, (req, res) => {
  if (req.session.user.role >= 2) {
    db.LeaseTerms.findByIdAndUpdate(
      req.params.id,
      req.body,
      // return the edited state of user, not the initial
      { new: true },
      (err, updatedLeaseTerms) => {
        if (err) return res.send(err);
        return res.json(updatedLeaseTerms);
      })
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

// DESTROY lease terms
// requires the user be an admin of the property
router.delete("/:id", verifySession, (req, res) => {
  if (req.session.user.role >= 2) {
    db.LeaseTerms.findByIdAndDelete(req.params.id, (err, deletedLeaseTerms) => {
      if (err) return res.send(err);
      return res.json(deletedLeaseTerms);
    });
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

module.exports = router;