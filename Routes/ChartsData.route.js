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
    let { page = 1, limit = 10 } = req.query;

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
    limit = limit == "" ? 10 : limit;

    // Use parseInt to ensure page and limit are treated as numbers
    // page = parseInt(page);
    // limit = parseInt(limit);

    let query_keys = Object.keys(req.query);
    let schema_all_Keys = Object.keys(ChartsSchema["obj"]);

    // let object = {};
    // query_keys.forEach((r) => {
    //   let name = r.toString();
    //   object = { [r]: req.query?.[name], ...object };
    // });

    const Charts = await ChartModel.find({ intensity: { $lte: 1000 } })
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

// give the paginated likelihood
chartsRoutes.get("/likelihood/:id", async (req, res) => {
  try {
    const { id = 100 } = req.params;
    let { page = 1, limit = 10 } = req.query;

    // again default
    page = page == "" ? 1 : page;
    limit = limit == "" ? 10 : limit;
    // again default

    const Charts = await ChartModel.find({ likelihood: { $lte: id } })
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

// give the paginated relevance
chartsRoutes.get("/relevance/:id", async (req, res) => {
  try {
    const { id = 1000 } = req.params;
    let { page = 1, limit = 10 } = req.query;

    // again default
    page = page == "" ? 1 : page;
    limit = limit == "" ? 10 : limit;
    // again default

    const Charts = await ChartModel.find({ relevance: { $lte: id } })
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

// give the paginated intensity
chartsRoutes.get("/intensity/:id", async (req, res) => {
  try {
    const { id = 1000 } = req.params;
    let { page = 1, limit = 10 } = req.query;

    // again default
    page = page == "" ? 1 : page;
    limit = limit == "" ? 10 : limit;
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

// give the paginated country
chartsRoutes.get("/country/:id", async (req, res) => {
  try {
    const { id = 1000 } = req.params;
    let { page = 1, limit = 10 } = req.query;

    // again default
    page = page == "" ? 1 : page;
    limit = limit == "" ? 10 : limit;
    // again default

    const Charts = await ChartModel.find({})
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

// give the Filter Data
chartsRoutes.get("/filter/:id", async (req, res) => {
  try {
    const { id = 1000 } = req.params;
    let { page = 1, limit = 10, filter } = req.query;

    // again default
    page = page == "" ? 1 : page;
    limit = limit == "" ? 10 : limit;
    // again default

    const filterCriteria = filter ? { [id]: filter } : {};

    const Charts = await ChartModel.find({ ...filterCriteria })
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
