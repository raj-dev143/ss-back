require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./middleware/cors");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes"); // New import
require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors);
app.use(bodyParser.json());

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes); // New route for user management

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
