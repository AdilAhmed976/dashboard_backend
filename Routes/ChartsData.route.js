const { ChartModel } = require("../Models/Charts.model");
const { Router } = require("express");
const chartsRoutes = Router();

chartsRoutes.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 20 } = req.query;

    // again default
    page = page == "" ? 1 : page;
    limit = limit == "" ? 20 : limit;

    // Use parseInt to ensure page and limit are treated as numbers
    page = parseInt(page);
    limit = parseInt(limit);

    const Charts = await ChartModel.find({})
      .maxTimeMS(30000)
      .limit(limit)
      .skip((page - 1) * limit);

    if (Charts.length === 0) {
      return res.send("No Data found...");
    }
    res.json(Charts);
  } catch (error) {
    console.error("Error fetching charts:", error);
    // Handle the error and send an appropriate response
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = { chartsRoutes };
