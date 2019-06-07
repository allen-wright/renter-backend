// /api/v1/chats
const express = require("express");
const router = express.Router();
const db = require("../models");
const verifyToken = require('../middleware/verification');

// INDEX chats
// if the user is a tenant, gets all of their chats
// if the user is an admin, get all of the chats for their property
// if the user is the site owner, gets all chats
router.get("/all", verifyToken, (req, res) => {
  if (req.decodedUser.role === 1) {
    db.Chat.find({ tenant: req.decodedUser._id }, (err, foundChats) => {
      if (err) return res.status(404).json({ error: 'Could not find the chat.'});
      return res.json(foundChats);
    })
  } else if (req.decodedUser.role === 2) {
    db.Chat.find({ property: req.decodedUser.property }, (err, foundChats) => {
      if (err) return res.status(404).json({ error: 'Could not find the chat.'});
      return res.json(foundChats);
    })
  } else if (req.decodedUser.role >= 3) {
    db.Chat.find({}, (err, foundChats) => {
      if (err) return res.status(404).json({ error: 'Could not find the chat.'});
      return res.json(foundChats);
    })
  } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
  }
});

// SHOW chat
// gets a chat - requires a user be the admin of the property, or site owner
router.get("/:id", verifyToken, (req, res) => {
  db.Chat.findById(req.params.id, (err, foundChat) => {
    if (err) return res.status(404).json({ error: 'Could not find the chat.'});
    if (req.decodedUser.role >= 3
      || req.decodedUser.role >= 2 && req.decodedUser.property === foundChat.property) {
      return res.json(foundChat);
    } else {
      return res.status(401).json({ error: 'You are not authorized to do that.'});
    }
  })
});

// CREATE chat
router.post('/', verifyToken, (req, res) => {
  // block users from creating chats that aren't on the same property unless they're a site owner
  if (req.decodedUser.property === req.body.property || req.decodedUser.role >= 3) {
    db.Chat.create(req.body, (err, newChat) => {
      if (err) return res.send(err);
      return res.json(newChat);
    });
 } else {
    return res.status(401).json({ error: 'You are not authorized to do that.'});
 }
});

// UPDATE chat
// requires the user be a site owner
router.put("/:id", verifyToken, (req, res) => {
  if (req.decodedUser.role >= 3) {
    db.Chat.findByIdAndUpdate(
      req.params.id,
      req.body,
      // return the edited state of chat, not the initial
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
router.post('/:id/messages', verifyToken, (req, res) => {
  db.Chat.findById(req.params.id, (err, foundChat) => {
    if (err) return res.status(404).json({error: 'Could not find the chat with that ID.'});
    if (req.decodedUser._id === foundChat.tenant || req.decodedUser.role === 2) {
      foundChat.messages.push({
        senderId: req.decodedUser._id,
        content: req.body.content
      });
      foundChat.save((err, savedChat) => {
        if (err) res.status(500).json({error: 'There was an error saving the message. Please try again.'});
        res.json(savedChat);
      })
    } else {
      return res.status(401).json({error: 'You are not authorized to do that.'});
    }
  });
});

module.exports = router;