// /api/v1/chats
const express = require("express");
const router = express.Router();
const db = require("../models");
const verifyToken = require('../middleware/verification');

// SHOW chat
// gets the user's chats via their ID
router.get("/", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 2) {
    db.Chat.findById(req.decodedUser.chat, (err, foundChat) => {
      if (err) return res.status(404).json({ error: 'Could not find the chat.'});
      return res.json(foundChat);
    })
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// SHOW chat
// requires the user be the site owner
router.get("/:id", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Chat.findById(req.params.id, (err, foundChat) => {
      if (err) return res.status(404).json({ error: 'Could not find the chat.'});
      return res.json(foundChat);
    })
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// INDEX chats
// gets all chats
// requires the user be the site owner
router.get("/all", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Chat.find({}, (err, allProperties) => {
      if (err) return res.send(err);
      return res.json(allProperties);
    });
 } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
 }
});

// CREATE chat
router.post('/', (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Chat.create(req.body, (err, newChat) => {
      if (err) return res.send(err);
      return res.json(newChat);
    });
 } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
 }
});

// UPDATE chat
// requires the user be an admin of the chat, or the site owner
router.put("/:id", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 2 && req.params.id === req.decodedUser.chat
    || req.decodedUser.role >= 3) {
    db.Chat.findByIdAndUpdate(
      req.params.id,
      req.body,
      // return the edited state of user, not the initial
      { new: true },
      (err, updatedChat) => {
        if (err) return res.send(err);
        return res.json(updatedChat);
      })
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

// DESTROY chat
// requires the user be the site owner
router.delete("/:id", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Chat.findByIdAndDelete(req.params.id, (err, deletedChat) => {
      if (err) return res.send(err);
      return res.json(deletedChat);
    });
  } else {
    return res.status(401).json({ error: "You are not authorized to do that." });
  }
});

// CREATE message
router.post('/:id/messages', (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Chat.create(req.body, (err, newChat) => {
      if (err) return res.send(err);
      return res.json(newChat);
    });
 } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
 }
});

// DESTROY message
// only the sender of the message can delete the message using this route
router.delete('/:id/messages', (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Chat.create(req.body, (err, newChat) => {
      if (err) return res.send(err);
      return res.json(newChat);
    });
 } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
 }
});

module.exports = router;