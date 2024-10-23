const express = require("express");
const router = express.Router();
const Event = require("../models/events");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve events." });
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    nameOrOrganisation,
    location,
    registration,
    startDate,
    endDate,
    startTime,
    endTime,
    timeZone,
    description,
    extraInfoAfterRegistration,
    maxParticipants,
    images,
  } = req.body;

  if (
    !title ||
    !nameOrOrganisation ||
    !registration ||
    !startDate ||
    !startTime ||
    !registration.payment.required
  ) {
    return res
      .status(400)
      .send({ error: "All required fields must be provided." });
  }

  try {
    const event = new Event({
      title,
      nameOrOrganisation,
      location,
      registration,
      startDate,
      endDate,
      startTime,
      endTime,
      timeZone,
      description,
      extraInfoAfterRegistration,
      maxParticipants,
      images,
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
    nameOrOrganisation,
    location,
    registration,
    startDate,
    endDate,
    startTime,
    endTime,
    timeZone,
    description,
    extraInfoAfterRegistration,
    maxParticipants,
    images,
  } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        nameOrOrganisation,
        location,
        registration,
        startDate,
        endDate,
        startTime,
        endTime,
        timeZone,
        description,
        extraInfoAfterRegistration,
        maxParticipants,
        images,
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
