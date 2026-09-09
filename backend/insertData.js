const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

const opportunities = [
  {
    title: "Frontend Developer Intern",
    company: "Tech Solutions",
    domain: "Web Development",
    location: "Hyderabad",
    experience: "Fresher",
    description: "Work on frontend development using HTML, CSS and JavaScript.",
    applicationLink: "https://example.com/apply"
  },
  {
    title: "Python Developer Intern",
    company: "Innovate Labs",
    domain: "Python",
    location: "Bangalore",
    experience: "Fresher",
    description: "Develop Python applications and work with backend technologies.",
    applicationLink: "https://example.com/apply"
  },
  {
    title: "AI/ML Intern",
    company: "Future AI",
    domain: "Artificial Intelligence",
    location: "Hyderabad",
    experience: "Fresher",
    description: "Learn and work on Artificial Intelligence and Machine Learning projects.",
    applicationLink: "https://example.com/apply"
  }
];

async function insertData() {
  try {
    await client.connect();

    console.log("DB Connected Successfully");

    const db = client.db("internshipPortal");

    const collection = db.collection("opportunities");

    const result = await collection.insertMany(opportunities);

    console.log(`${result.insertedCount} opportunities inserted successfully`);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await client.close();
  }
}

insertData();