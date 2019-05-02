let db= require('../../models');

module.exports =(req,res)=>{
    const bookId = req.query.id;
    var userId = req.token ? req.token.id : null;

}