const asyncHandler = require("express-async-handler");
require("dotenv").config({ path: "./config/.env" });
const User = require("../models/User");
const Chef = require("../models/Chef");
const jwt = require("jsonwebtoken");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  const authorization = req.headers.authorization || req.headers["x-access-token"];

  if (!authorization) {
    throw new Error("No token provided");
  }

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
    if (error) {
      res.json({ message: `Invalid Token` });
    }
    decoded = result;
  });

  req.user = await User.findById(decoded.id);

  if (!req.user) {
    req.user = await Chef.findById(decoded.id);
    if (!req.user) {
      res.status(401);
      throw new Error(`Not authorized to access this route`);
    }
  }
  next();
});

exports.authorize = (...roles) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return asyncHandler((req, res, next) => {
    if (roles.length && !roles.includes(req.user.userType)) {
      res.status(401);
      throw new Error(`Not authorized to access this route`);
    }

    next();
  });
};
