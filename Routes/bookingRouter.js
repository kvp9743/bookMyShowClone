import express from "express";
import validateToken from "../Middleware/authmiddleware.js";
import {
  bookAShow,
  getAllBookings,
  makePayment,
} from "../Controller/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/makePayment", validateToken, makePayment);
bookingRouter.post("/bookShow", validateToken, bookAShow);
bookingRouter.post("/getAllBookings", validateToken, getAllBookings);

export default bookingRouter;
