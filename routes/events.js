const express = require("express");
const router = express.Router();
const Event = require("../models/events");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
    .populate("location")
    .populate("registration")
    .populate("attendees");
    res.json(events || []);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve events." });
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    timeZone,
    description,
    extraInfoAfterRegistration,
    maxParticipants,
    images,
    location,
    createdBy,       
    createdByModel,  
    registration,    
    attendees,
  } = req.body;

  if (!title || !startDate || !startTime) {
    return res
      .status(400)
      .send({ error: "All required fields must be provided." });
  }

  try {
    const event = new Event({
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      timeZone,
      description,
      extraInfoAfterRegistration,
      maxParticipants,
      images,
      location,
      createdBy,       
      createdByModel,
      registration,    
      attendees: attendees || [] 
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    startTime,
    endTime,
    timeZone,
    description,
    extraInfoAfterRegistration,
    maxParticipants,
    images,
    registration,    
    attendees,
  } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        timeZone,
        description,
        extraInfoAfterRegistration,
        maxParticipants,
        images,
        registration,    
        attendees: attendees || [] 
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).send({ error: "Event not found." });
    }

    res.json(event);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send({ error: "Event not found." });
    }
    res.json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
