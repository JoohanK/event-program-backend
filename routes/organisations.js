const express = require("express");
const router = express.Router();
const Organisation = require("../models/organisations");

router.get("/", async (req, res) => {
  try {
    const organisations = await Organisation.find().populate("eventID");
    res.json(organisations);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve organisations." });
  }
});

router.post("/", async (req, res) => {
  const { eventID, name, email } = req.body;

  if (!eventID) {
    return res.status(400).send({ error: "Event ID is required." });
  }

  if (!name) {
    return res.status(400).send({ error: "Name is required." });
  }

  try {
    const organisation = new Organisation({
      eventID,
      name,
      email,
    });

    await organisation.save();
    res.status(201).json(organisation);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { eventID, name, email } = req.body;

  try {
    const organisation = await Organisation.findByIdAndUpdate(
      req.params.id,
      { eventID, name, email },
      { new: true }
    );

    if (!organisation) {
      return res.status(404).send({ error: "Organisation not found." });
    }

    res.json(organisation);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const organisation = await Organisation.findByIdAndDelete(req.params.id);
    if (!organisation) {
      return res.status(404).send({ error: "Organisation not found." });
    }
    res.json({ message: "Organisation deleted successfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
