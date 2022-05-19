import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteRental,
  retrieveRentals,
  rentalPatch,
} from "../resources/rentals/rentalSlice";

import { Link } from "react-router-dom";

const Rentals = () => {
  const rental = useSelector((state) => state.rentalReducer.rentals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveRentals());
  }, []);

  return (
    <div className="bg-gradient-to-tl from-green-600 to-red-600 w-full py-16 px-10 rounded-lg  border b dark:border-black ">
      <div
        className="Movies relative  flex flex-col sm:justify-center  items-center"
        data-aos="fade-down"
      >
        <h1 className=" font-serif italic  font-bold hover:font-bold text-black text-4xl ">
          Rental Details
        </h1>
        <div className="w-screen shadow-xl relative overflow-x-auto shadow-md rounded-lg dark:border-black justfiy contents-center border border-black ">
          <table className=" object-center text-sm text-left text-gray-500 dark:text-gray-400 place-content-center   w-3/5 rounded-lg justify-center">
            <thead className="text-white uppercase bg-gray-200 dark:bg-black dark:text-white font-serif  text-lg">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer_Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Movie_Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date_IN
                </th>
                <th scope="col" className="px-6 py-3">
                  Date_out
                </th>
                <th scope="col" className="px-6 py-3">
                  Rental_Fees
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
                <th scope="col" className="px-6 py-3">
                  Return
                </th>
              </tr>
            </thead>
            <tbody>
              {rental.map((r) => (
                <tr className="border-b dark:bg-white dark:border-black odd:bg-white even:bg-gray-50 odd:dark:bg-blue-400 even:dark:bg-indigo-400 dark:text-black font-serif  text-lg">
                  <td className="px-6 py-4 font-medium  whitespace-nowrap">
                    {r.customer.name}
                  </td>
                  <td className="px-6 py-4 font-medium  whitespace-nowrap">
                    {r.movie.title}
                  </td>
                  <td className="px-6 py-4 font-medium  whitespace-nowrap">
                    {r.dateIn}
                  </td>
                  <td className="px-6 py-4 font-medium  whitespace-nowrap">
                    {r.dateOut}
                  </td>
                  <td className="px-6 py-4 font-medium  whitespace-nowrap">
                    {r.rentalFee}
                  </td>
                  <td className="px-6 py-4 font-medium  whitespace-nowrap">
                    <button
                      type="button"
                      className=" font-bold bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-black font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 animate-pulse text-black border border-black"
                      onClick={() => dispatch(deleteRental(r._id))}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium  whitespace-nowrap">
                    <button
                      type="button"
                      className=" font-bold  focus:outline-none focus:ring-4 focus:ring-black font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-600 animate-pulse text-black border border-black"
                      onClick={() => {
                        dispatch(
                          rentalPatch({
                            _id: r._id,
                            dateIn: new Date().getTime(),
                          })
                        );
                      }}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <span className="btn  ml-56">
            <tr className=" bg-white border-b dark:bg-blue-400 dark:border-black">
              <td className="  mx-5 px-6 py-5 font-medium text-gray z-900 dark:text-white whitespace-nowrap">
                <button
                  type="text"
                  className="w-full
      px-6
      py-2.5
      bg-red-600
      text-black
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
                  <Link to="/rental/new"> Insert </Link>
                </button>
              </td>
            </tr>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Rentals;
