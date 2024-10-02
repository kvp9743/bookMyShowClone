import express from "express";
import {
  AddMovie,
  DeleteMovie,
  GetAllMovies,
  GetMovieById,
  UpdateMovie,
} from "../Controller/movieController.js";
import validateToken from "../Middleware/authmiddleware.js";

const movieRouter = express.Router();

movieRouter.post("/addMovie", validateToken, AddMovie);
movieRouter.get("/getAllMovies", validateToken, GetAllMovies);
movieRouter.patch("/updateMovie", validateToken, UpdateMovie);
movieRouter.post("/deleteMovie", validateToken, DeleteMovie);
movieRouter.get("/getMovieById/:id", validateToken, GetMovieById);

export default movieRouter;
