import express from "express";
import {
  addShow,
  addTheater,
  deleteShow,
  deleteTheater,
  getAllShowsByMovieId,
  getAllTheater,
  getSeatsByShowId,
  getShowByTheaterId,
  getTheaterByUserId,
  updateTheater,
} from "../Controller/theaterController.js";
import validateToken from "../Middleware/authmiddleware.js";

const theaterRouter = express.Router();

theaterRouter.get("/getAllTheaters", validateToken, getAllTheater);
theaterRouter.post("/addTheater", validateToken, addTheater);
theaterRouter.patch("/updateTheater", validateToken, updateTheater);
theaterRouter.post("/deleteTheater", validateToken, deleteTheater);
theaterRouter.post("/getTheaterByOwnerId", validateToken, getTheaterByUserId);
theaterRouter.post("/addShow", validateToken, addShow);
theaterRouter.post("/deleteShow", validateToken, deleteShow);
theaterRouter.post("/getShowByTheaterId", validateToken, getShowByTheaterId);
theaterRouter.post(
  "/getAllShowsByMovieId",
  validateToken,
  getAllShowsByMovieId
);
theaterRouter.post("/getSeatsByShowId", validateToken, getSeatsByShowId);

export default theaterRouter;
