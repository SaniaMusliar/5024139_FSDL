const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/students", require("./routes/studentRoutes"));

// home route
app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});