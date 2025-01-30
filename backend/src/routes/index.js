const express = require('express');
const router = express.Router();
const Event = require('../models/event');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/events', async function (req, res, next) {
  const { title } = req.body
  const event = new Event({title: title});
  await event.save();

  console.log(event);

  res.send(event);
});


router.post('/events/:eventid/questions', async function (req, res, next) {
  const { eventid } = req.params
  const { text } = req.body
  const event = await Event.findById({ _id: eventid })
  
  if(!event) return next(new Error('Event not found'))

  event.questions.push({ text })

  try {
    await event.save()
    res.send(event)
  } catch(e) {
      next(e)
  }

})

module.exports = router;
