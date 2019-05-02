const express = require("express");
const app = express();
const port = require("./config/config.json").port;
require('./middleware')(app,express);

let db = require("./models");
//db.sequelize.sync();



app.listen(port, function() {
    console.log("Example app listening on port 3000!");
  });