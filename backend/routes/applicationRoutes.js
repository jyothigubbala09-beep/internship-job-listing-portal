const express = require("express");

const router = express.Router();

let db;

const setDatabase = (database) => {
  db = database;
};

// Submit application
router.post("/", async (req, res) => {
  try {
    const application = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      resume: req.body.resume,
      opportunityId: req.body.opportunityId,
      createdAt: new Date()
    };

    await db.collection("applications").insertOne(application);

    res.status(201).json({
      message: "Application submitted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit application",
      error: error.message
    });
  }
});

module.exports = {
  router,
  setDatabase
};