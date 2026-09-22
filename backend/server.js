const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URL);

const {
  router: opportunityRoutes,
  setDatabase
} = require("./routes/opportunityRoutes");

const {
  router: applicationRoutes,
  setDatabase: setApplicationDatabase
} = require("./routes/applicationRoutes");

const {
  router: adminRoutes,
  setDatabase: setAdminDatabase
} = require("./routes/adminRoutes");

// Basic routes
app.get("/", (req, res) => {
  res.json({
    message: "Internship & Job Listing Portal API is running"
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend API is working successfully"
  });
});

// Start database connection
async function startDatabase() {
  try {
    await client.connect();

    console.log("DB Connected Successfully");

    const db = client.db("internshipPortal");

    setDatabase(db);
    setApplicationDatabase(db);
    setAdminDatabase(db);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
}

startDatabase();

// API routes
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;