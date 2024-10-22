const express = require("express");
const router = express.Router();
const Event = require("../models/events");

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ error: "Name is required" });
  }

  try {
    const event = new Event({
      name: req.body.name,
      description: req.body.description,
    });
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
  });
  if (!event) {
    return res.status(404).send({ error: "Event not found" });
  }
  res.json(event);
});

router.delete("/:id", async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) {
    return res.status(404).send({ error: "Event not found" });
  }
  res.json(event);
});

module.exports = router;
