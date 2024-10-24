const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  
  if (!name) {
    return res.status(400).send({ error: "Name is required" });
  }

  try {
    const user = new User({    
      name,
      email,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
