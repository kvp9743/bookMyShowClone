import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    show: {
      type: mongoose.Schema.ObjectId,
      ref: "shows",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    seats: {
      type: Array,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

export default bookingModel;
