module.exports = (req, res, next) => {
  if (!req.token)
    res.status(401).send("you dont have permisions to do that");
  else next();
};
