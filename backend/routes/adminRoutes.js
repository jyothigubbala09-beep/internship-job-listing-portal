const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

let db;

const setDatabase = (database) => {
  db = database;
};

// Create a new opportunity
router.post("/opportunities", async (req, res) => {
  try {
    const opportunity = {
      title: req.body.title,
      company: req.body.company,
      domain: req.body.domain,
      location: req.body.location,
      experience: req.body.experience,
      description: req.body.description,
      applicationLink: req.body.applicationLink,
      createdAt: new Date()
    };

    const result = await db
      .collection("opportunities")
      .insertOne(opportunity);

    res.status(201).json({
      message: "Opportunity created successfully",
      opportunityId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create opportunity",
      error: error.message
    });
  }
});
// Update an opportunity
router.put("/opportunities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOpportunity = {
      title: req.body.title,
      company: req.body.company,
      domain: req.body.domain,
      location: req.body.location,
      experience: req.body.experience,
      description: req.body.description,
      applicationLink: req.body.applicationLink
    };

    const result = await db
      .collection("opportunities")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedOpportunity }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Opportunity not found"
      });
    }

    res.json({
      message: "Opportunity updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update opportunity",
      error: error.message
    });
  }
});
// Delete an opportunity
router.delete("/opportunities/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db
      .collection("opportunities")
      .deleteOne({
        _id: new ObjectId(id)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Opportunity not found"
      });
    }

    res.json({
      message: "Opportunity deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete opportunity",
      error: error.message
    });
  }
});
module.exports = {
  router,
  setDatabase
};