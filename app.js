const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use("/api/students", require("./routes/studentRoutes"));

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});