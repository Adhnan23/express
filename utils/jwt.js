import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "";

export const generateToken = (userData) => {
  if (!secret) throw new Error("No Secret Found");
  const token = jwt.sign(userData, secret, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token) => {
  if (!secret) throw new Error("No Secret Found");
  const decryptedData = jwt.verify(token, secret);
  return decryptedData;
};
