const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Genre, validateGenre } = require("../models/genreModel");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");

router.get("/", async (req, res) => {
  const genres = await Genre.find({});
  if (genres && genres.length == 0) {
    return res.status(404).send("Genres not found");
  }
  res.status(200).send(genres);
});

router.get("/:id", validObjectId, async (req, res) => {
  const genre = await Genre.findById({ _id: req.params.id });
  if (genre && genre.length == 0) {
    return res.status(404).send("Genres not found");
  }
  res.status(200).send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });

  await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  );
  if (!genre) {
    return res.send("Genre not found");
  } else {
    res.send(genre);
  }
});

router.delete("/:id", auth, admin, async (req, res) => {
  const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
  if (!genre) {
    return res.status(401).send("Genre not found");
  } else {
    res.send(genre);
  }
});

module.exports = router;
