const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1]
  if (token) {
    jwt.verify(token, "masainews", (err, user) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send('Token not provided');
  }
};
module.exports = auth;