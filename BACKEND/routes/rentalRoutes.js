const express = require("express");
const { Customer } = require("../models/customerModel");
const { Movie } = require("../models/movieModel");
const router = express.Router();
const { Rental, validateRental } = require("../models/rentalModel");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");

router.get("/", async (req, res) => {
  const rental = await Rental.find();
  if (rental.length == 0) return res.status(404).send("No Rental found");

  res.send(rental);
});

router.get("/:id", validObjectId, auth, async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("No Rental found");
});

router.post("/", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Please check the customerId");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Please check the MovieId");

  if (movie.numberInStocks == 0)
    return res.status(400).send("Movie out of stock");

  const rental = new Rental({
    customer: {
      name: customer.name,
      phone: customer.phone,
      _id: customer._id,
    },
    movie: {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      _id: movie._id,
    },
    rentalFee: movie.dailyRentalRate * 10,
  });
  const session = await Rental.startSession();
  session.startTransaction();
  try {
    await rental.save();

    await Movie.findByIdAndUpdate(movie._id, {
      $inc: {
        numberInStocks: -1,
      },
    });
    session.commitTransaction();
    session.endSession();
    res.send(rental);
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    console.log(error.message);
    return res.status(500).send("something has failed");
  }
});

router.patch("/:id", validObjectId, auth, async (req, res) => {
  const session = await Rental.startSession();
  session.startTransaction();
  const rental = await Rental.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        dateIn: req.body.dateIn,
      },
    },
    { new: true }
  );
  await Movie.findByIdAndUpdate(rental.movie._id, {
    $inc: {
      numberInStocks: 1,
    },
  });
  session.commitTransaction();
  session.endSession();
  res.send(rental);
});

router.delete("/:id", validObjectId, auth, admin, async (req, res) => {
  const session = await Rental.startSession();
  session.startTransaction();

  const rental = await Rental.findByIdAndDelete(req.params.id);
  await Movie.findByIdAndUpdate(
    rental.movie._id,
    {
      $inc: {
        numberInStocks: 1,
      },
    },
    { new: true }
  );
  session.commitTransaction();
  session.endSession();
  res.send(rental);
});
module.exports = router;
