import jwt from "jsonwebtoken";
import { generateTokens, verifyToken } from "../utils/utils.js";
import Users from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const authCtrl = {
  register: asyncHandler(async (req, res) => {
    try {
      const { firstname, lastname, username, email, password, gender } = req.body;
      let newUserName = username?.toLowerCase().replace(/ /g, "");
      const user_name = await Users.findOne({ username: newUserName });
      if (user_name) return res.status(400).json({ msg: "This user name already exists." });

      const user_email = await Users.findOne({ email });
      if (user_email) return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters." });

      const newUser = await Users.create({
        firstname,
        lastname,
        username: newUserName,
        email,
        password,
        gender,
      });
      if (newUser) {
        const { password, ...user } = newUser._doc;
        const { access_token, refresh_token } = generateTokens(user._id);
        setCookies(res, refresh_token);
        res.json({ success: true, data: { user: user, access_token, refresh_token } });
      }
    } catch (err) {
      res.status(401);
      throw new Error(`${err}`);
    }
  }),

  login: asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;

      const newUser = await Users.findOne({ email }).populate("followers following", "avatar username fullname followers following").populate("saved ");
      if (!newUser) return res.status(400).json({ msg: "This email does not exist." });

      if (newUser && (await newUser.matchPassword(password))) {
        const { password, ...user } = newUser._doc;
        const { access_token, refresh_token } = generateTokens(user._id);
        setCookies(res, refresh_token);

        res.json({ success: true, data: { user: user, access_token, refresh_token, msg: "Login successful" } });
      } else {
        res.status(401).json({ msg: "Incorrect email and password" });
      }
    } catch (err) {
      res.status(401);
      throw new Error(`${err}`);
    }
  }),

  logout: async (req, res) => {
    try {
      res.clearCookie("x-refresh-token", { path: "/api/refresh" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  generateRefreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies["x-refresh-token"];
      if (!rf_token) return res.status(400).json({ msg: "Please login now." });

      const result = verifyToken(rf_token, "REFRESH");
      const user = await Users.findById(result).select("-password").populate("followers following", "avatar username fullname followers following");

      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const { access_token, refresh_token } = generateTokens(user._id);
      setCookies(res, refresh_token);
      res.json({ success: true, data: { user: user, access_token, refresh_token } });
    } catch (err) {
      res.status(500);
      throw new Error(`${err}`);
    }
  },
};

const setCookies = (res, token) => {
  const secureStatus = false;
  if (process.env.NODE_ENV === "production") {
    secureStatus = true;
  }
  res.cookie("x-refresh-token", token, { httpOnly: true, secure: secureStatus, path: "/api/refresh", maxAge: 30 * 24 * 60 * 60 * 1000 });
};
export default authCtrl;
