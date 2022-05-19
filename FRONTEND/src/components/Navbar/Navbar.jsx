import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./navbar.css";

function Navbar() {
  const [togglerNav, setTogglerNav] = useState(false);

  const clickHandler = () => {
    setTogglerNav(!togglerNav);
  };

  return (
    <div className="z-auto">
      <nav className="h-auto mt-0 md:h-28 p-2  bg-gradient-to-r from-green-400 via-purple-800 to-red-500 w-full max-w-8xl   border-2 border-black  shadow-lg shadow-red-800 md:shadow-xl mx-auto flex items-center justify-between pt-5 flex justify-between md:items-center">
        <h1 className="animate-bounce font-serif   italic  font-bold hover:font-bold text-black  antialiased md:subpixel-antialiased text-4xl ">
          Movie Rental
        </h1>
        <div
          className={
            togglerNav ? "flex flex-col gap-4 md:inline" : "hidden md:inline"
          }
        >
          <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
            <NavLink
              className=" nav-link border-2 border-black "
              onClick={clickHandler}
              to="/movies"
            >
              Movies
            </NavLink>
            <NavLink
              className="nav-link border-2 border-black"
              onClick={clickHandler}
              to="/customers"
            >
              Customers
            </NavLink>
            <NavLink
              className="nav-link border-2 border-black"
              onClick={clickHandler}
              to="/genres"
            >
              Genres
            </NavLink>
            <NavLink
              className="nav-link border-2 border-black"
              onClick={clickHandler}
              to="/rentals"
            >
              Rentals
            </NavLink>
            <NavLink
              className="nav-link border-2 border-black"
              onClick={clickHandler}
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="nav-link border-2 border-black"
              onClick={clickHandler}
              to="/register"
            >
              Register
            </NavLink>
          </div>
        </div>

        <button
          className=" inline md:hidden self-start nav-link"
          onClick={clickHandler}
        >
          {togglerNav ? <AiOutlineClose /> : <FaBars />}
        </button>
      </nav>

      <Outlet />
    </div>
  );
}

export default Navbar;
