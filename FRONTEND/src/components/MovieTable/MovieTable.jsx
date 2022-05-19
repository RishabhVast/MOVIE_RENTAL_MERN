import React from "react";
import { Link } from "react-router-dom";
import { deleteMovie } from "../../resources/movie/movieSlice";
import TableHeader from "../TableHeader/TableHeader";

import { useDispatch } from "react-redux";


const MovieTable = (props) => {

    const { movies  , onSort , sortColumn  ,onDelete} = props;
   
    const dispatch = useDispatch();


    const columns = [
      {
        path : "title", header : "TITLE"
       
      },
      {
        path : "genre.name", header : "GENRE"
       
      },
      {
        path : "numberInStocks", header : "STOCK"
       
      },
      {
        path : "dailyRentalRate", header : "RATE"
       
      },
      {
        key : "LIKE" 
      },
      {
        key : "DELETE"
      }
    ]
    
    return (  
 
    <table className=" w-full  text-sm text-left text-gray-500 dark:text-gray-400 place-content-center   w-3/5 rounded-lg justify-center">
    <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn}></TableHeader>
    <tbody data-aos="fade-in">
      {movies.map((m) => (
        <tr
          key={m._id}
          className="border-b dark:bg-white dark:border-black odd:bg-white even:bg-gray-50 odd:dark:bg-blue-500 even:dark:bg-indigo-500 dark:text-black font-serif  text-lg"
        >
          <td className="px-6 py-4">
            <Link to={`/movies/${m._id}`}>{m.title} </Link>
          </td>
          <td className="px-6 py-4">{m.genre.name}</td>
          <td className="px-6 py-4">{m.numberInStocks}</td>
          <td className="px-6 py-4">{m.dailyRentalRate}</td>
          <td className="px-6 py-4">
            {m.liked === true ? (
              <ion-icon
                style={{
                  color: "red",
                  fontSize: "22px",
                }}
                name="heart"
              ></ion-icon>
            ) : (
              <ion-icon
                style={{
                  color: "red",
                  fontSize: "22px",
                }}
                name="heart-empty"
              ></ion-icon>
            )}{" "}
          </td>
    
          <td className="px-6 py-4">
            <button
              type="button"
              className="bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 animate-pulse text-black border border-black"
              onClick={() => dispatch(onDelete(m._id))}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      <button className="btn  ml-60">
        <tr className=" bg-white border-b dark:bg-blue-500 dark:border-gray-700 ">
          <th
            scope="row"
            className="  mx-5 px-6 py-5 font-medium text-blue-600 dark:text-white whitespace-nowrap"
          >
            <button
              type="button"
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
              <Link to="/movies/new">Insert</Link>
            </button>
          </th>
        </tr>
      </button>
    </tbody>
    </table> );
}
 
export default MovieTable;