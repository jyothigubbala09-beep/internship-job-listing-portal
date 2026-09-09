const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

let db;

const setDatabase = (database) => {
  db = database;
};

// Get all opportunities
router.get("/", async (req, res) => {
  try {
    const opportunities = await db
      .collection("opportunities")
      .find()
      .toArray();

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch opportunities",
      error: error.message
    });
  }
});

// Get one opportunity by ID
router.get("/:id", async (req, res) => {
  try {
    const opportunity = await db
      .collection("opportunities")
      .findOne({
        _id: new ObjectId(req.params.id)
      });

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found"
      });
    }

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch opportunity",
      error: error.message
    });
  }
});

module.exports = {
  router,
  setDatabase
};