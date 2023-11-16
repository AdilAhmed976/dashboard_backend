const mongoose = require("mongoose");
require("dotenv").config();

const Connnection = mongoose.Connection(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

module.exports = { Connnection };
