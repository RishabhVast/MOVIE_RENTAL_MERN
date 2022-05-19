import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { createRental } from "../../resources/rentals/rentalSlice";
import { retrieveMovies } from "../../resources/movie/movieSlice";
import { retrieveCustomers } from "../../resources/customers/customerSlice";

const schema = yup.object().shape({
  customerId: yup.string().required(),
  movieId: yup.string().required(),
});
const RentalForm = () => {
  const customer = useSelector((state) => state.customerReducer.customers);
  const movies = useSelector((state) => state.movieReducer.movies);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    dispatch(retrieveMovies());
    dispatch(retrieveCustomers());
  }, []);

  const onSubmitHandler = (data) => {
    dispatch(createRental(data));
    navigator("/rentals");
  };

  return (
    <div data-aos="flip-up">
      <h1 className="font-bold text-xl font-serif m-5">Rentals Form</h1>
      <div className=" flex items-center justify-center m-2">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm bg-gradient-to-tl from-orange-600 to-purple-500 border border-black">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="border border-black  form-group mb-6 border py-2">
              <label> Movie: </label>
              <select
                className="  dropdown-content border border-black"
                {...register("movieId")}
                id="movie"
              >
                <option className=" mb-4 border py-2 px-3 font-bold">
                  Select Movie
                </option>
                {movies.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>
            <p>{errors.movieId?.message}</p>
            <div className="border border-black  form-group mb-6 border py-2">
              <label> Customer: </label>
              <select
                className="dropdown-conten border border-black"
                {...register("customerId")}
                id="customer"
              >
                <option className="border py-2 px-3 border border-black font-bold">
                  Select Customer
                </option>
                {customer.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <p>{errors.customerId?.message}</p>
            <button
              type="submit"
              className="
      w-full
      px-6
      py-2.5
      bg-red-600
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
      ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentalForm;
