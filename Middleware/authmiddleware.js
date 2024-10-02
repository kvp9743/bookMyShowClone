import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SecretKey = process.env.SecretKey;

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SecretKey);
    req.body.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default validateToken;
