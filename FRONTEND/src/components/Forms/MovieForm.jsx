import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateMovie, createMovie } from "../../resources/movie/movieSlice";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().min(5).max(50).required(),
  genreId: yup.string().required(),
  numberInStocks: yup.number().min(0).max(255).required(),
  dailyRentalRate: yup.number().min(0).max(255).required(),
  liked: yup.boolean(),
});
const MovieForm = () => {
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genreReducer.genres);
  const movies = useSelector((state) => state.movieReducer.movies);
  console.log(`these are the movies`, movies);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const params = useParams();

  useEffect(() => {
    const movieId = params.movieId;
    if (!movieId) return;
    const movie = movies.find((m) => m._id === params.movieId);
    if (!movie) return;
    setValue("title", movie.title);
    setValue("dailyRentalRate", movie.dailyRentalRate);
    setValue("numberInStocks", movie.numberInStocks);
    setValue("_id", movie._id);
    setValue("genreId", movie.genre._id);
    setValue("liked", movie.liked);
  }, []);

  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    console.log("this is movies data", { data });

    {
      data._id ? dispatch(updateMovie(data)) : dispatch(createMovie(data));
      console.log(` data is cretaed `, data);
    }
    navigate("/movies");
  };
  return (
    <div data-aos="flip-up">
      <h1 className="mt-5 ml-96 mr-64 font-serif italic  font-bold hover:font-bold text-black text-4xl">
        Movie Form
      </h1>
      <div className=" flex items-center justify-center">
        <div className=" mt-10 block p-6 rounded-lg shadow-lg bg-white max-w-sm  bg-gradient-to-tl from-orange-600 to-purple-500 border border-black">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-black
        bg-white bg-clip-padding
        border border-solid border-black
        rounded
        transition
        ease-in-out
        m-0
        focus:text-black focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput90"
                placeholder="Title"
                {...register("title")}
              />
              <p className="text-black">{errors.title?.message}</p>
            </div>

            <div className=" border border-black  form-group mb-6 border py-2">
              <label for="genre" className="ml-2">
                {" "}
                Genre:{" "}
              </label>
              <select
                className="dropdown-content ml-2 border border-black"
                {...register("genreId")}
                id="genre"
              >
                <option className="border border-black">Select Genre</option>
                {genres.map((g) => (
                  <option value={g._id}>{g.name}</option>
                ))}
              </select>
            </div>
            <p className="text-red-900">{errors.genreId?.message}</p>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-grey-900
        bg-white bg-clip-padding
        border border-solid border-black
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput91"
                placeholder="Daily Rental Rate"
                {...register("dailyRentalRate")}
              />
              <p className="text-black">{errors.dailyRentalRate?.message}</p>
            </div>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-grey-800
        bg-white bg-clip-padding
        border border-solid border-black
        rounded
        transition
        ease-in-out
        m-0
        focus:text-red-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput91"
                placeholder="Number In Stock"
                {...register("numberInStocks")}
              />
              <p className="text-yellow-400">
                {errors.numberInStocks?.message}
              </p>
              <input
                id="remember_me"
                type="checkbox"
                className=" mt-6  ml-4 border border-black"
                {...register("liked")}
              />
              <span className="mt-2 ml-4 text-base text-black font-bold font-serif">
                Like
              </span>
              <p className="text-yellow-400">{errors.liked?.message}</p>
            </div>

            <button
              type="submit"
              className="
      w-full
      px-6
      py-2.5
      bg-black
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-red-700 hover:shadow-lg
      focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-red-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      animate-pulse"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
