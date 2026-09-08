const express = require("express");

const router = express.Router();

const opportunities = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Solutions",
    domain: "Web Development",
    location: "Hyderabad",
    experience: "Fresher"
  },
  {
    id: 2,
    title: "Python Developer Intern",
    company: "Innovate Labs",
    domain: "Python",
    location: "Bangalore",
    experience: "Fresher"
  },
  {
    id: 3,
    title: "AI/ML Intern",
    company: "Future AI",
    domain: "Artificial Intelligence",
    location: "Hyderabad",
    experience: "Fresher"
  }
];

router.get("/", (req, res) => {
  res.json(opportunities);
});

module.exports = router;