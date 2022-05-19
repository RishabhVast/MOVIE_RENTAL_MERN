import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./register.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRegister } from "../resources/register/registerSlice";

const schema = yup.object().shape({
  name: yup.string().min(5).max(25),
  email: yup.string().email(),
  password: yup.string().min(8).max(10),
  isAdmin: yup.boolean(),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    console.log(data);
    dispatch(createRegister(data));
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-tl from-green-600 to-red-600 w-full py-16 px-10 rounded-lg  border b dark:border-black ">
      <div className="font-sans ">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center items-center bg-gradient-to-tl from-yellow-400 to-indigo-400">
          <div className="relative sm:max-w-sm w-full" data-aos="flip-right">
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gradient-to-tl from-green-600 to-red-600  shadow-md text-black">
              <label className="block mt-3 text-xl text-black text-center font-bold font-serif">
                Register
              </label>
              <form
                className="mt-10 text-black"
                onSubmit={handleSubmit(onSubmitHandler)}
                method="post"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Enter Username..."
                    className="px-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    {...register("name")}
                  />
                  <p className="text-red-900">{errors.username?.message}</p>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter email address..."
                    className="px-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    {...register("email")}
                  />
                  <p className="text-red-900">{errors.email?.message}</p>
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Enter password..."
                    className="px-4 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    {...register("password")}
                  />
                  <p className="text-red-900">{errors.password?.message}</p>
                </div>
                <br />
                <div className="flex justify-center">
                  <div className="form-check">
                    <label
                      for="remember_me"
                      className="inline-flex items-center w-full cursor-pointer"
                    >
                      <input
                        id="remember_me"
                        type="checkbox"
                        className=" rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        {...register("isAdmin")}
                      />
                      <span className="ml-2 text-base text-black font-bold font-serif">
                        Admin
                      </span>
                    </label>
                    <p className="text-red-900">{errors.isAdmin?.message}</p>
                  </div>
                </div>
                <div className="mt-7">
                  <button
                    className="bg-red-600 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    type="submit"
                  >
                    Submit
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
                    <label className="mr-2">Existing User ?</label>
                    <a
                      href="#"
                      className="  text:black hover:text-blue-600 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                    >
                      <Link to="/login">Sign in</Link>
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

export default Register;
