const express = require("express");
const cors = require("cors");

//Imports
const { Connection } = require("mongoose");

//Configs
const app = express();
require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.use("/", (req, res) => {
    return res.send("Welcoe to the Home")
});

app.listen(PORT, async () => {
  try {
    await Connection;
    console.log("Connected");
  } catch (error) {
    console.log("🚀 ~ file: index.js:19 ~ app.listen ~ error:", error);
  }
  console.log("connection to the PORT - " + PORT);
});
