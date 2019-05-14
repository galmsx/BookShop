var basket = require("./basket");
var isSigned = require("../isSigned");
var GetMoney = require("./GetMoney");
var postMoney = require("./PostMoney");
var purchases = require("./purchases");
var buyBook = require('./buyBook');
var setRate = require('./setRate');

module.exports = express => {
  var router = express.Router();
  router.get("/basket", basket);
  router.get("/money", isSigned, GetMoney);
  router.post("/money", isSigned, postMoney);
  router.get("/purchases", isSigned, purchases);
  router.get('/buybook',isSigned,buyBook);
  router.get('/setrate',isSigned,setRate);

  return router;
};
