import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { retrieveGenres } from "../resources/genre/genreSlice";

import {
  deleteMovie,
  getMovies,
  getCount,
} from "../resources/movie/movieSlice";
import Pagination from "../components/pagination/pagination";
import ListGroup from "./listGroup";
import SearchBox from "../components/searchBox/SearchBox";
import MovieTable from "../components/MovieTable/MovieTable";

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [genreName, setGenreName] = useState("");
  const [title, setTitle] = useState("");
  const [sortColumn , setSortColumn] = useState({ path : 'title' , order : 1})
  const movies = useSelector((state) => state.movieReducer.movies);
  const error = useSelector((state) => state.movieReducer.error);
  const totalMovies = useSelector((state) => state.movieReducer.totalMovies);
  console.log(` total movies from movies`, totalMovies);
  const genres = useSelector((state) => state.genreReducer.genres);
  const dispatch = useDispatch();

  // for genres
  useEffect(() => {
    let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
    dispatch(getCount(gName));
  }, [movies]);

  // use effect for movies

  useEffect(() => {
    dispatch(getCount());
    dispatch(
      getMovies({ currentPage: currentPage, pageSize: pageSize, genreName , sortColumn })
    );
    dispatch(retrieveGenres());
  }, []);

  //search

  //pagination

  const handlePageChange = (page) => {
    let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
    setCurrentPage(page);
    dispatch(getMovies({ pageSize, currentPage: page, genreName: gName  , sortColumn}));
  };

  //genre filter

  const handleGenreSelection = (genreName) => {
    let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
    setGenreName(genreName);
    setCurrentPage(1);
    dispatch(getMovies({ pageSize, currentPage: 1, genreName: gName , sortColumn}));
  };




  const handleSort = (sortColumn) => {
    let gName = "";
    if (genreName !== "All Genres") {
      gName = genreName;
    }
    setSortColumn(sortColumn);
    console.log("sorting", sortColumn);
    dispatch(
      getMovies({
        pageSize,
        currentPage : 1,
        genreName: gName,
        title,
        genres, 
        sortColumn,
      })
    );
  };



 const handleDelete = (id)=>{
   
   setCurrentPage(1)
   dispatch(deleteMovie(id))
 }


  const searchFunction = (searchString) => {
    dispatch(getMovies({ pageSize,
      currentPage :1,
      searchString,

     }));
  };
  let searchProp = { searchFunction };

  return (
    
    <div className="">
       
      <div className="Movies relative " data-aos="fade-down">
      <div className="mt-6 ml-4 ">
       <SearchBox {...searchProp}></SearchBox>
       </div>
        <div className=" ml-8">
        
          <ul class=" w-48 text-white uppercase  dark:bg-black dark:text-white font-serif  text-lg rounded-lg">
            <ol>
              <ListGroup
                items={[{ _id: "", name: "All Genres" }, ...genres]}
                onItemSelect={handleGenreSelection}
                selectedItem={genreName}
              />
            </ol>
          </ul>
        </div>
        <div className="absolute absolute top-0 right-10">
        {error && <h4 style={{ color: "red" }}>Something Failed </h4>}
          {movies && movies.length > 0 ? (
        <MovieTable movies={movies} onSort={handleSort} onDelete={handleDelete} sortColumn={sortColumn}></MovieTable>
        ) : (
          <p>No movies found in the database</p>
        )}
          <Pagination
            itemsCount={totalMovies}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
