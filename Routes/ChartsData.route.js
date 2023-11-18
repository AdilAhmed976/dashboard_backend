const { ChartModel, ChartsSchema } = require("../Models/Charts.model");
const { Router } = require("express");
const chartsRoutes = Router();

let filters = [
  "end_year",
  "topics",
  "sector",
  "region",
  "pestle",
  "source",
  "country",
];

const returnQryAsPerParams = (queryKeys) => {};

chartsRoutes.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 20 } = req.query;

    // let vars = {
    //   intensity,
    //   likelihood,
    //   relevance,
    //   start_year,
    //   country,
    //   topic,
    //   region,
    // };

    // again default
    page = page == "" ? 1 : page;
    limit = limit == "" ? 20 : limit;

    // Use parseInt to ensure page and limit are treated as numbers
    page = parseInt(page);
    limit = parseInt(limit);

    let query_keys = Object.keys(req.query);
    let schema_all_Keys = Object.keys(ChartsSchema["obj"]);

    // let object = {};
    // query_keys.forEach((r) => {
    //   let name = r.toString();
    //   object = { [r]: req.query?.[name], ...object };
    // });

    const Charts = await ChartModel.find({})
      .maxTimeMS(30000)
      .limit(limit)
      .skip((page - 1) * limit);

    Charts.length === 0
      ? res.json({ message: "NO_DATA_FOUND" })
      : res.json(Charts);
  } catch (error) {
    console.error("Error fetching charts:", error);
    // Handle the error and send an appropriate response
    res.status(500).send({ error: "Internal Server Error" });
  }
});

chartsRoutes.get("/intensity/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { page = 1, limit = 20 } = req.query;

    // again default
    page = page == "" ? 1 : page;
    limit = limit == "" ? 20 : limit;
    // again default

    const Charts = await ChartModel.find({ intensity: { $lte: id } })
      .maxTimeMS(30000)
      .limit(limit)
      .skip((page - 1) * limit);

    Charts.length === 0
      ? res.json({ message: "NO_DATA_FOUND" })
      : res.json(Charts);
  } catch (error) {
    console.error("Error fetching charts:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = { chartsRoutes };
