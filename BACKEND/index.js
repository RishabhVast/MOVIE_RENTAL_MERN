const express = require("express");
// console.log(config);
// console.log(process.env);
const app = express();
const cors = require("cors");
app.use(cors());

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
if (process.env.NODE_ENV != "test") {
  require("./startup/port")(app);
}

module.exports = app;
