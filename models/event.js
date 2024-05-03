const mongoose = require("mongoose");

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

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
