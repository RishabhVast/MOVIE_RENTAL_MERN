import React, { useEffect } from "react";
//import {getGenres}   from "../services/getGenres";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteGenre, retrieveGenres } from "../resources/genre/genreSlice";
//import { deleteGenre } from "../resources/genre/genreSlice";

const Genres = () => {
  const genres = useSelector((state) => state.genreReducer.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveGenres());
  }, []);
  // function handleDelete(id) {
  //   const genre = genres.filter((genres) => genres._id !== id);
  //   setGenres(genre);
  // }
  return (
    <div className="bg-gradient-to-tl from-green-600 to-red-600 w-full py-16 px-10 rounded-lg  border b dark:border-black ">
      <div
        className="genre flex flex-col sm:justify-center  items-center"
        data-aos="flip-up"
      >
        <h1 className="font-serif italic  font-bold hover:font-bold text-black text-4xl">
          Genres Details
        </h1>
        <div className=" relative overflow-x-auto shadow-md sm:rounded-lg border border-black">
          <table className=" shadow-xl w-1/4 text-sm text-left text-white dark:text-gray-400 ">
            <thead className=" text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-white dark:bg-black dark:text-white font-serif  text-lg">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Genre Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {genres.map((g) => (
                <tr
                  key={g._id}
                  className="border-b dark:bg-white dark:border-black odd:bg-white even:bg-gray-50 odd:dark:bg-blue-400 even:dark:bg-indigo-400 dark:text-black font-serif  text-lg"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap"
                  >
                    <Link to={`/genre/${g._id}`}> {g.name} </Link>
                  </th>
                  <td className="px-2 py-4">
                    <button
                      type="button"
                      className="bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 animate-pulse text-black border border-black"
                      onClick={() => dispatch(deleteGenre(g._id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              <span className="btn ml-32">
                <tr className=" bg-white border-b dark:bg-blue-400 dark:border-black">
                  <th
                    scope="row"
                    className="  mx-5 px-6 py-5 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <button
                      type="button"
                      className="w-full
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
      ease-in-out
      animate-pulse
      border border-black"
                    >
                      <Link to="/genre/new"> Insert </Link>
                    </button>
                  </th>
                </tr>
              </span>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Genres;
