const express = require("express");
const { Genre } = require("../models/genreModel");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movieModel");
// const Movie = require('../models/movieModel');
// const validateMovie = require('../models/movieModel')
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");


router.get("/", async (req, res) => {
  const movies = await Movie.find({});
  if (!movies) return res.status(404).send(" Movies not found   ");
  res.status(200).send(movies);
});

router.get("/count", async (req, res) => {
  const { genreName } = req.query;
  let query = {};
  if (genreName) {
    query["genre.name"] = genreName;
  }

  const totalMovies = await Movie.find(query).count();
  res.status(200).send({ totalMovies });
});

router.get("/:id", validObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send(" Movie not found ");
  res.send(movie);
});
router.post("/pfs", async (req, res) => {
  console.log("in the node testing strings", req.body);
  const { currentPage, pageSize, genreName, searchString , sortColumn } = req.body;
  let skip;
  if (currentPage > 0) {
    skip = (currentPage - 1) * pageSize;
  }

  let query = {};
  if (genreName) {
    query["genre.name"] = genreName;
  }
  if (searchString) {
    query["title"] = new RegExp(`^${searchString}`, "i");
  }

  let sort = {}
  console.log("sortColumn",sortColumn);
  if(sortColumn){
    //let path = Object.keys(sortColumn)
    //let order = Object.values(sortColumn) 

    let { path , order} = sortColumn
    sort[path] = order

  }
  console.log("before sort",sort);
  const movies = await Movie.find(query).sort(sort).skip(skip).limit(pageSize)

  res.send(movies);
});




router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Genre not found");
  const movie = new Movie({
    title: req.body.title,
    dailyRentalRate: req.body.dailyRentalRate,
    numberInStocks: req.body.numberInStocks,
    liked: req.body.liked,

    genre: {
      name: genre.name,
    },
  });
  await movie.save();
  res.send(movie);
});

router.put("/:id", validObjectId, auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(404).send(error);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Please check genreId");
  const _id = req.params.id;
  const movie = await Movie.findByIdAndUpdate(
    _id,
    {
      $set: {
        title: req.body.title,
        genre: {
          name: genre.name,
          _id: genre._id,
        },
        dailyRentalRate: req.body.dailyRentalRate,
        numberInStocks: req.body.numberInStocks,
        liked: req.body.liked,
      },
    },
    { new: true }
  );
  res.send(movie);
});
router.delete("/:id", validObjectId, auth, admin, async (req, res) => {
  const _id = req.params.id;
  const movie = await Movie.findByIdAndDelete(_id);
  if (!movie) return res.status(404).send("Couldn't find movie");
  res.send(movie);
});

//pagination routes



module.exports = router;
