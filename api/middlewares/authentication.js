const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verify = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      "tokens.token": token,
      _id: decoded._id,
    });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "You are not logged in!" });
  }
};

module.exports = { verify };
