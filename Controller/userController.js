import userModule from "../Module/userModule.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SecretKey = process.env.SecretKey;
console.log(SecretKey);

const register = async (req, res) => {
  try {
    const userExists = await userModule.findOne({ email: req?.body?.email });
    if (userExists) {
      return res.status(200).json({
        success: false,
        message: "User email already exits!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req?.body?.password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModule(req?.body);
    const userData = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User Registered Successfully, Please Login.",
      userData: userData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const userExists = await userModule.findOne({ email: req?.body?.email });
    if (userExists) {
      const validateUser = await bcrypt.compare(
        req?.body?.password,
        userExists.password
      );
      if (validateUser) {
        const token = jwt.sign({ userId: userExists._id }, SecretKey, {
          expiresIn: "1d",
        });
        res.status(200).json({
          success: true,
          message: `Hello!, Welcome back ${userExists?.name}`,
          data: token,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Incorrect Password! Please try agian.",
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: "User does not exits!",
      });
    }
  } catch (err) {
    res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyprofile = async (req, res) => {
  try {
    const user = await userModule.findById(req.body.userId).select("-password");
    res.status(200).send({
      success: true,
      message: "User Data fetched successfully!",
      data: user,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

export { register, login, getMyprofile };
