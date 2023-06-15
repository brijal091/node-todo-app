//JWT Token
var jwt = require("jsonwebtoken");
const JWT_SECRET = "TestSecreteKey";

// Middleware function that should check the user before lodging the page that user is authenticated or not

fetchUser = (req, res, next) => {
  try {
    const jwt_token = req.header("token");
    if (!jwt_token) {
      res.status(401).send({ error: "You need to Login To view this page" });
    }
    const data = jwt.verify(jwt_token, JWT_SECRET);
    let userId = data.user.id;
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = fetchUser;
