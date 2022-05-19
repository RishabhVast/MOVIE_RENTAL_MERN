import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { createLogin } from "../resources/login/loginSlice";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(10).required(),
});
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(createLogin(data));
    navigate("/genres");
  };

  return (
    <div className="bg-gradient-to-tl from-green-600 to-red-600 w-full py-16 px-10 rounded-lg  border b dark:border-black ">
      <div className="font-sans">
        <div className="relative min-h-screen flex flex-col sm:justify-center  items-center bg-gradient-to-tl from-indigo-400 to-yellow-400  ">
          <div
            className="relative sm:max-w-sm w-full text-black"
            data-aos="flip-left"
          >
            {/* <div className="card bg-blue-600 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div> */}
            {/* <div className="card bg-red-800 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div> */}
            <div className="relative w-full rounded-3xl  px-6 py-4  bg-gradient-to-tl from-green-600 to-red-600  shadow-md text-black">
              <label className="block mt-3 text-xl text-black text-center font-bold font-serif">
                Login
              </label>
              <form
                className="mt-6 text-black"
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                <div>
                  <input
                    type="email"
                    placeholder="Enter Email Address..."
                    className="px-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    {...register("email")}
                  />
                  <p className="text-red-900">{errors.email?.message}</p>
                </div>

                <div className="mt-7">
                  <input
                    type="password"
                    placeholder="Enter Password..."
                    className="px-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    {...register("password")}
                  />
                  <p className="text-red-900">{errors.password?.message}</p>
                </div>

                <div className="mt-7 flex text-black">
                  <label
                    for="remember_me"
                    className="inline-flex items-center w-full cursor-pointer text-black"
                  >
                    <input
                      id="remember_me"
                      type="checkbox"
                      className=" rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      name="remember"
                    />
                    <span className="ml-2 text-sm text-black">Remember me</span>
                  </label>

                  <div className="w-full text-right">
                    <a
                      className="underline text-sm text-black hover:text-blue-400"
                      href="#"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className="mt-7">
                  <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Login
                  </button>
                </div>

                <div className="flex mt-7 items-center text-center">
                  <hr className="border-gray-300 border-1 w-full rounded-md" />
                  <label className="block font-medium text-sm text-black w-full">
                    Movie Rental
                  </label>
                  <hr className="border-gray-300 border-1 w-full rounded-md" />
                </div>

                <div className="mt-7">
                  <div className="flex justify-center items-center">
                    <label className="mr-2">New User ?</label>
                    <a
                      href="#"
                      className=" text-black hover:text-blue-400 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                      <Link to="/register">Create New Account</Link>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
