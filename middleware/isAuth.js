require("dotenv").config();
const jwt = require("jsonwebtoken");

//this is the middleware its gives all the details of the current user..

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer token
    let verification = jwt.verify(token, process.env.JWT_SECRET);
    try {
      if (verification) {
        req.id = verification.id;
        next();
      } else {
        res.status(401).send("Operation not allowed.");
      }
    } catch (err) {
      return res.send(err.message);
    }
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

module.exports = isAuth;
