import movieModel from "../Module/movieModel.js";

const AddMovie = async (req, res) => {
  try {
    const movie = new movieModel(req?.body);
    const dataToSave = await movie.save();
    res.status(201).send({
      success: true,
      message: "Movie addedd Successfully!",
      data: dataToSave,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const GetAllMovies = async (req, res) => {
  try {
    const allMovies = await movieModel.find();
    res.status(201).send({
      success: true,
      message: "All movies fetched Successfully!",
      data: allMovies,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const UpdateMovie = async (req, res) => {
  try {
    const updatedMovie = await movieModel.findByIdAndUpdate(
      req?.body?._id,
      req?.body
    );
    res.status(201).send({
      success: true,
      message: "Movie Updated Successfully!",
      data: updatedMovie,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const DeleteMovie = async (req, res) => {
  try {
    const data = await movieModel.findByIdAndDelete(req?.body?._id);

    res.status(200).send({
      success: true,
      message: "Movie Deleted Successfully!",
      data: data,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const GetMovieById = async (req, res) => {
  try {
    const movie = await movieModel.findById(req?.params.id);
    res.status(201).send({
      success: true,
      message: "Movies details fetched Successfully!",
      data: movie,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

export { AddMovie, GetAllMovies, UpdateMovie, DeleteMovie, GetMovieById };
