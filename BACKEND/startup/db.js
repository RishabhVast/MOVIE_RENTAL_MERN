const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  mongoose.connect(config.get("DB_Connection_url")).then(() => {
    console.log(`Connected to  ${config.get("DB_Connection_url")}`);
  });
};
