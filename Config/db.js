const mongoose = require("mongoose");
require("dotenv").config();

const Connection = mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});
module.exports = { Connection };
