const privateKey = "bla";
let jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let decoded = await jwt.verify(authorization, privateKey);
    if (decoded) {
      const { email, _id } = decoded;
      req.email = email;
      next();
    } else {
      res.json({ message: "something went wrong" });
    }
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = auth;
