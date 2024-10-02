import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.dbURL;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connection to DataBase is Successful!!");
  })
  .catch((err) => {
    console.log(err);
  });
