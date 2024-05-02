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
  bookedBy: String,
  start: Date,
  end: Date,
  charges: Number,
  ground: String,
  ball: String,
  food: String,
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
  const { title, bookedBy, start, end, charges, ground, ball, food } = req.body;
  const newEvent = new Event({
    title,
    bookedBy,
    start,
    end,
    charges,
    ground,
    ball,
    food,
  });
  try {
    const savedEvent = await newEvent.save();
    res
      .status(201)
      .json({ message: "Event added successfully", event: savedEvent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  const { title, bookedBy, start, end, charges, ground, ball, food } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        bookedBy,
        start,
        end,
        charges,
        ground,
        ball,
        food,
      },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
