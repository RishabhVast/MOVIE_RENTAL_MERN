const winston = require("winston");
require('express-async-errors')


module.exports = function () {

    winston.configure({
        transports: [
            new winston.transports.Console(), new winston.transports.File(
                {filename: "logfile.log"}
            )
        ]
    });
    process.on("uncaughtException", function (ex) {
        winston.error("we got an uncaught exception" + ex.message);
        process.exit(1)
    });
    
    process.on("unhandledRejection", function (ex) {
        winston.error("we got an unhandled exception" + ex.message);
        process.exit(1)
    })
};


