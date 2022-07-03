import { nanoid, customAlphabet } from "nanoid";
import jwt from "jsonwebtoken";

const alphabets = "abcdefghijklmnopqrstuvwxyz1234567890";

export const generateId = () => {
  return customAlphabet(alphabets, 6)();
};

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIREI,
  });
};

export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIREII });
};

export const verifyToken = (token, type = "ACCESS") => {
  let key = process.env.ACCESS_TOKEN_SECRET;

  if (type === "REFRESH") {
    key = process.env.REFRESH_TOKEN_SECRET;
  }

  try {
    const decoded = jwt.verify(token, key);
    if (typeof decoded === "object") {
      const { id } = decoded;
      return id;
    }
    return false;
  } catch {
    return false;
  }
};

export const generateTokens = (id) => {
  const access_token = generateAccessToken(id);
  const refresh_token = generateRefreshToken(id);
  return { access_token, refresh_token };
};
