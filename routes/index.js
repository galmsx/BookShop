var main = require("./main");
var api = require("./api");
module.exports = (app, express) => {
  app.use("/api", api(express));
  app.get("/*", main);
};
