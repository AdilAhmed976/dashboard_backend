const { ChartModel } = require("../Models/Charts.model");
const { Router } = require("express");
const chartsRoutes = Router();

chartsRoutes.get("/", async (req, res) => {
  try {
    const Charts = await ChartModel.find({});
    res.json(Charts);
  } catch (error) {
    console.error("Error fetching charts:", error);
    // Handle the error and send an appropriate response
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = { chartsRoutes };
