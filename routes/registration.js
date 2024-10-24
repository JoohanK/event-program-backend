const express = require("express");
const router = express.Router();
const Registration = require("../models/registration");

router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("eventID");
    res.json(registrations);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve registrations." });
  }
});

router.post("/", async (req, res) => {
  const {
    eventID,
    requiresRegistration,
    approvalRequired,
    invitationRequired,
    payment,
  } = req.body;
  
  if (!eventID) {
    return res.status(400).send({ error: "Event ID is required." });
  }
  try {
    const registration = new Registration({
      eventID,
      requiresRegistration,
      approvalRequired,
      invitationRequired,
      payment,
    });

    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const {
    eventID,
    requiresRegistration,
    approvalRequired,
    invitationRequired,
    payment,
  } = req.body;

  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      {
        eventID,
        requiresRegistration,
        approvalRequired,
        invitationRequired,
        payment,
      },
      { new: true }
    );

    if (!registration) {
      return res.status(404).send({ error: "Registration not found." });
    }

    res.json(registration);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).send({ error: "Registration not found." });
    }
    res.json({ message: "Registration deleted successfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
