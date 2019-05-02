var User = require("../../models").User;
var jwt = require("jsonwebtoken");
var secret = require("../../config/config.json").secret;
module.exports = (req, res) => {
  var login = req.query.login;
  var password = req.query.password;
  User.findOne({ where: { login, password } })
    .then(user => {
      if (!user) {
        res.status(400).send("incorrect login or pass");
        return;
      }
      var payload = {
        id: user.dataValues.id,
        login: user.dataValues.login,
        isAdmin: user.dataValues.isAdmin
      };

      res.send(jwt.sign(payload, secret, { expiresIn: "7d" }));
    })
    .catch(er => res.status(500).send(er));
};
