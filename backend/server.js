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

async function startServer() {
  try {
    await client.connect();

    console.log("DB Connected Successfully");

    const db = client.db("internshipPortal");

    setDatabase(db);

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

    app.use("/api/opportunities", opportunityRoutes);

    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });

  } catch (error) {
    console.log("Database Connection Error:", error);
  }
}

startServer();