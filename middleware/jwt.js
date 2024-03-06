const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.js");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) {
      throw createError(401, "You are not authenticated!");
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);

    console.log('Token Payload:', payload);

    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    req.isAdmin = payload.isAdmin;

    next();
  } catch (err) {
    console.error('Token Verification Error:', err.message);

    if (err.name === 'TokenExpiredError') {
      return next(createError(403, "Token has expired"));
    }

    next(createError(403, "Token is not valid!"));
  }
};
