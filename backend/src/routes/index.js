const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const socketServer = require('../socket-connection')

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/events", async function (req, res, next) {
  const { title } = req.body;
  const event = new Event({ title: title });
  await event.save();

  res.send(event);
});

router.get("/events/:eventid/questions", async function (req, res, next) {
  const { eventid } = req.params
  const event = await Event.findById({ _id: eventid })
  
  if (!event) return next(new Error("Event not found"));

  event.questions.sort((a, b) => b.createdAt - a.createdAt)

  res.send(event.questions);
});

router.post("/events/:eventid/questions", async function (req, res, next) {
  const { eventid } = req.params;
  const { text, user } = req.body;
  const event = await Event.findById({ _id: eventid });

  if (!event) return next(new Error("Event not found"));

  event.questions.push({ text, user });

  try {
    await event.save();
    event.questions.sort((a, b) => b.createdAt - a.createdAt)

    socketServer().to(eventid).emit('questions updated', event.questions)

    res.send(event);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
