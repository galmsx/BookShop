var router = require("../routes");
var jwtParse = require("./jwt-parse");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

module.exports = (app, express) => {
  app.use(express.static("public"));
  app.use(fileUpload());
  app.use(bodyParser.json());
  app.use(jwtParse);
  router(app, express);
};
