import ShowModal from "../Module/showModel.js";
import theaterModel from "../Module/theaterModel.js";

const addTheater = async (req, res) => {
  try {
    const newTheater = new theaterModel(req?.body);
    const dataToSave = await newTheater.save();
    res.status(201).send({
      success: true,
      message: " Theater Added Successfully!",
      data: dataToSave,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const addShow = async (req, res) => {
  try {
    const newShow = new ShowModal(req?.body);
    const dataToSave = await newShow.save();
    res.status(201).send({
      success: true,
      message: " Movie Show Added Successfully!",
      data: dataToSave,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const updateTheater = async (req, res) => {
  try {
    const data = await theaterModel.findByIdAndUpdate(
      req?.body?._id,
      req?.body
    );
    res.status(201).send({
      success: true,
      message: "Theater Updated Successfully!",
      data: data,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const getAllTheater = async (req, res) => {
  try {
    const allTheaters = await theaterModel.find().populate("owner");
    res.status(201).send({
      success: true,
      message: "All Theater feached Successfully!",
      data: allTheaters,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const getTheaterByUserId = async (req, res) => {
  try {
    const allTheaters = await theaterModel.find({ owner: req?.body?.owner });
    res.status(200).send({
      success: true,
      message: "All theaters by Owner fectched Successfully!",
      data: allTheaters,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const deleteTheater = async (req, res) => {
  try {
    await theaterModel.findByIdAndDelete(req?.body?._id);
    res.status(200).send({
      success: true,
      message: "Theater Deleted Successfully!",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const deleteShow = async (req, res) => {
  try {
    await ShowModal.findByIdAndDelete(req?.body?._id);
    res.status(200).send({
      success: true,
      message: " Movie show Deleted Successfully!",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const getShowByTheaterId = async (req, res) => {
  try {
    const data = await ShowModal.find({ theater: req?.body?._id })
      .populate("movie")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: " Movie shows fetched Successfully!",
      data: data,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const getAllShowsByMovieId = async (req, res) => {
  try {
    const { movie, date } = req?.body;
    const shows = await ShowModal.find({ movie, date })
      .populate("theater")
      .sort({ createdAt: -1 });

    const uniqueTheaters = [];
    shows.forEach((currShow) => {
      const isPresent = uniqueTheaters.find((theater) => {
        return theater?._id === currShow?.theater?._id;
      }); // isPresent is true if the current theater is already added to uniqueTheaters

      if (!isPresent) {
        //if not addedd yet
        const allShowsAtThisTheater = shows.filter(
          (show) => show.theater._id === currShow.theater._id
        );
        uniqueTheaters.push({
          ...currShow.theater._doc,
          shows: allShowsAtThisTheater,
        });
      }
    });
    res.status(200).send({
      success: true,
      message: " Movie shows fetched Successfully!",
      data: uniqueTheaters,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const getSeatsByShowId = async (req, res) => {
  try {
    const data = await ShowModal.findById(req?.body?.id)
      .populate("movie")
      .populate("theater");
    res.status(200).send({
      success: true,
      message: " Booking Status fetched Successfully!",
      data: data,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

export {
  addTheater,
  updateTheater,
  deleteTheater,
  getAllTheater,
  getTheaterByUserId,
  addShow,
  deleteShow,
  getShowByTheaterId,
  getAllShowsByMovieId,
  getSeatsByShowId,
};
