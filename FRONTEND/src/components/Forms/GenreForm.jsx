import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createGenre, updateGenre } from "../../resources/genre/genreSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { getGenre } from "../../services/getGenres";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const schema = yup
  .object()
  .shape({ name: yup.string().min(3).max(10).required() });

const GenreForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const params = useParams();

  const genres = useSelector((state) => state.genreReducer.genres);
  useEffect(() => {
    const genreId = params.genreId;
    if (!genreId) return;

    const genre = getGenre(genreId);
    if (!genre) return;

    // const genreNew = genres.find((id))

    setValue("name", genre.name);
    setValue("_id", genre._id);
  }, []);

  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    data._id
      ? dispatch(updateGenre({ _id: data._id, name: data.name }))
      : dispatch(createGenre({ _id: nanoid(), name: data.name }));
    navigate("/genres");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const genreId = params.genreId;
    if (!genreId) return;

    const genre = genres.find((g) => g._id === params.genreId);
    if (!genre) return;

    setValue("name", genre.name);
    setValue("_id", genre._id);
  }, []);

  return (
    <div data-aos="flip-up">
      <h1 className="font-bold text-xl font-serif">Genre Form</h1>
      <div className="flex items-center justify-center my-3 ">
        <div className=" mt-16 block p-6 rounded-lg shadow-lg bg-white max-w-sm bg-gradient-to-tl from-orange-600 to-purple-600 border border-black">
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
                    text-gray-700
                    bg-white bg-clip-padding
                     border border-black
                     rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput90"
                placeholder="Genre Name"
                {...register("name")}
              />
              <p className="text-red-900">{errors.name?.message}</p>
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
                               animate-pulse
                               border border-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GenreForm;
