import express from "express";
import userRouter from "./Routes/userRouter.js";
import dotenv from "dotenv";
dotenv.config();
import "./Services/DBconnect.js";
import movieRouter from "./Routes/movieRouter.js";
import theaterRouter from "./Routes/theaterRouter.js";
import bookingRouter from "./Routes/bookingRouter.js";

const app = express();
const port = process.env.PORT;
app.use(express.static("./public"));
app.use(express.json());
app.use("/app/v1/users", userRouter);
app.use("/app/v1/users/admin", movieRouter);
app.use("/app/v1/users/theaters", theaterRouter);
app.use("/app/v1/users/booking", bookingRouter);

app.listen(port, () => {
  console.log(`Server in running at port -:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
