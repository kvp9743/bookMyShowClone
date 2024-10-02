import dotenv from "dotenv";
import bookingModel from "../Module/bookingModel.js";
import ShowModal from "../Module/showModel.js";
dotenv.config();

import Stripe from "stripe";

const stripe = new Stripe(process.env.stripeSecretKey);

const makePayment = async (req, res) => {
  try {
    const { token, amount } = req?.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      customer: customer.id,
      receipt_email: token.email,
      description: "Ticket Booking Successfull!",
      automatic_payment_methods: { enabled: true },
    });

    const transactionId = charge.id;
    res.status(201).send({
      success: true,
      data: transactionId,
      message: "Payment Successfull!",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const bookAShow = async (req, res) => {
  try {
    const newBooking = new bookingModel(req?.body);
    await newBooking.save();

    const show = await ShowModal.findById(req?.body?.show);

    await ShowModal.findByIdAndUpdate(req?.body?.show, {
      bookedSeats: [...show.bookedSeats, ...req?.body?.seats],
    });

    res.send({
      success: true,
      message: "Show Booked Succcessfully",
      data: newBooking,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookingData = await bookingModel
      .find({ user: req?.body?.userId })
      .populate("show")
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theater",
          model: "theaters",
        },
      });

    res.status(200).send({
      success: true,
      message: "Users Bookings fetched successfully",
      data: bookingData,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message || err,
    });
  }
};
export { makePayment, bookAShow, getAllBookings };
