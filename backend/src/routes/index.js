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
  const { session } = req;

  const event = await Event.findOne({_id: eventId});

  if (!event) return next(new Error("Event not found"));
  
  Event.decorateForUser(event, session.id);
  
  event.questions.sort((a, b) => b.createdAt - a.createdAt);
  event.questions.forEach((q) => console.log(q.voted))
  res.send(event.questions);
});

router.post("/events/:eventId/questions", async function (req, res, next) {
  const { eventId } = req.params;
  const { text, user } = req.body;
  const { session } = req;


  const event = await Event.findOne({_id: eventId});
  
  if (!event) return next(new Error("Event not found"));
  
  Event.decorateForUser(event, session.id);

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
    const { session } = req;
    const { vote } = req.body;

    const update = {}
    const predicate = { "questions.$.voters": session.id }
    
    if (vote == 'like') update.$addToSet = predicate
    else if (vote == 'dislike') update.$pull = predicate
    
    const filter = { _id: eventId, "questions._id": questionId };
    
    const event = await Event.findOneAndUpdate(filter, update, { new: true });
    
    if (!event) return next(new Error("Event not found"));

    Event.decorateForUser(event, session.id);
    
    event.questions.sort((a, b) => b.createdAt - a.createdAt);
    
    await event.save();
    
    socketServer().to(eventId).emit("questions updated", event.questions);
        
    res.sendStatus(200);
  }
);

module.exports = router;
