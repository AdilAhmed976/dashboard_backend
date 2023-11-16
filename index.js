const express = require("express");
const cors = require("cors");

//Imports
const { Connection } = require("./Config/db");
const { chartsRoutes } = require("./Routes/ChartsData.route");

//Configs
const app = express();
require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT || 8000;

//Routes
app.use("/", chartsRoutes);

app.listen(PORT, async () => {
  try {
    await Connection;
    console.log("Connected");
  } catch (error) {
    console.log("🚀 ~ file: index.js:19 ~ app.listen ~ error:", error);
  }
  console.log("PORT - " + PORT);
});
