const express = require("express");
const router = express.Router();
const Location = require("../models/locations");

router.get("/", async (req, res) => {
  try {
    const locations = await Location.find().populate("eventID");
    res.json(locations);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve locations." });
  }
});

router.post("/", async (req, res) => {
  const { eventID, physicalLocation, online } = req.body;

  if (!eventID) {
    return res.status(400).send({ error: "Event ID is required." });
  }
  if (!physicalLocation && !online) {
    return res.status(400).send({ error: "Location is required." });
  }

  try {
    const location = new Location({
      eventID,
      physicalLocation,
      online,
    });

    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { eventID, physicalLocation, online } = req.body;

  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { eventID, physicalLocation, online },
      { new: true }
    );

    if (!location) {
      return res.status(404).send({ error: "Location not found." });
    }

    res.json(location);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).send({ error: "Location not found." });
    }
    res.json({ message: "Location deleted successfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
