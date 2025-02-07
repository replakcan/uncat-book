const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const socketServer = require("../socket-connection");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/events", async function (req, res, next) {
  const { title } = req.body;
  const event = new Event({ title: title });
  await event.save();

  res.send(event);
});

router.get("/events/:eventId/questions", async function (req, res, next) {
  const { eventId } = req.params;

  const event = await Event.findById({ _id: eventId });
  if (!event) return next(new Error("Event not found"));

  event.questions.sort((a, b) => b.createdAt - a.createdAt);

  res.send(event.questions);
});

router.post("/events/:eventId/questions", async function (req, res, next) {
  const { eventId } = req.params;
  const { text, user } = req.body;

  const event = await Event.findById({ _id: eventId });
  if (!event) return next(new Error("Event not found"));

  event.questions.push({ text, user });

  try {
    await event.save();
    event.questions.sort((a, b) => b.createdAt - a.createdAt);

    socketServer().to(eventId).emit("questions updated", event.questions);

    res.send(event);
  } catch (e) {
    next(e);
  }
});

router.patch("/events/:eventId/questions/:questionId", async function (req, res, next) {
    const { eventId, questionId } = req.params;
    const { vote } = req.body;
    const { session } = req;

    const event = await Event.findById({ _id: eventId });
    if (!event) return next(new Error("Event not found"));
    
    const filter = { _id: eventId, "questions._id": questionId };
    const update = {
      $inc: { "questions.$.votes": vote == "like" ? 1 : -1 },
      $addToSet: { "questions.$.voters": session.id },
    };

    try {
      await Event.findOneAndUpdate(filter, update, { new: true });

      const updatedEvent = await Event.findById(eventId);
      updatedEvent.questions.sort((a, b) => b.createdAt - a.createdAt);

      event.questions.sort((a, b) => b.createdAt - a.createdAt);
      socketServer().to(eventId).emit("questions updated", updatedEvent.questions);

      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

module.exports = router;
