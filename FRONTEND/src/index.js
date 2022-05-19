import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./Routers/Login";
import Register from "./Routers/Register";
import Customers from "./Routers/Customers";
import CustomerForm from "./components/Forms/CustomerForm";
import Rentals from "./Routers/Rentals";
import Movies from "./Routers/Movies";
import Genre from "./Routers/Genres";
import GenreForm from "./components/Forms/GenreForm";
import MovieForm from "./components/Forms/MovieForm";
import RentalForm from "./components/Forms/RentalForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieForm />} />
          <Route path="movies/new" element={<MovieForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:customerId" element={<CustomerForm />} />
          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="rentals/:rentalId" element={<RentalForm />} />
          <Route path="rental/new" element={<RentalForm />} />
          <Route path="genres" element={<Genre />}></Route>
          <Route path="genre/:genreId" element={<GenreForm />} />
          <Route path="genre/new" element={<GenreForm />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <h1>There's nothing here!</h1>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);
