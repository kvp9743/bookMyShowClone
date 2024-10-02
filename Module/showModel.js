import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: "movies",
    },
    theater: {
      type: mongoose.Schema.ObjectId,
      ref: "theaters",
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const ShowModal = mongoose.model("shows", showSchema);

export default ShowModal;
