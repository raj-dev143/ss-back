require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Define schema
const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
});

// Define model
const Event = mongoose.model("Event", eventSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/events", async (req, res) => {
  const { title, start, end } = req.body;
  const newEvent = new Event({ title, start, end });
  try {
    const savedEvent = await newEvent.save();
    res
      .status(201)
      .json({ message: "Event added successfully", event: savedEvent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
