const Event = require("../models/event");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {
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
};

exports.updateEvent = async (req, res) => {
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
};

exports.deleteEvent = async (req, res) => {
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
};
