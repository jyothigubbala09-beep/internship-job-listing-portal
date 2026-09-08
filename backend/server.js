const express = require("express");
const cors = require("cors");

const opportunityRoutes = require("./routes/opportunityRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});