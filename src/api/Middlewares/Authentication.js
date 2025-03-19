const jwt = require("jsonwebtoken");

async function Authentication(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log(user)
    req.user = user;
    next();
  });
}

module.exports = Authentication;
