var User = require("../../../models").User;
module.exports = (req,res)=>{
    var userId = req.token.id;
    var amount = req.body.amount;

    User.findOne({where : {id : userId}})
    .then((result) => {
       result.money = + result.money + + amount;
       return result.save();
    })
    .then(_=>{
        res.send("ok");
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(err.message);
    });

}