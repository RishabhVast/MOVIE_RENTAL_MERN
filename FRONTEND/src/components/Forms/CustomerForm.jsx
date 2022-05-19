import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import {
  createCustomer,
  updateCustomer,
} from "../../resources/customers/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().min(5).max(15),
  phone: yup.string().min(7).max(10),
  isGold: yup.boolean(),
});
const CustomerForm = () => {
  const customers = useSelector((state) => state.customerReducer.customers);
  console.log(customers);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const params = useParams();

  useEffect(() => {
    const customerId = params.customerId;
    if (!customerId) return;
    const customer = customers.find((c) => c._id === customerId);
    if (!customer) return;
    setValue("name", customer.name);
    setValue("phone", customer.phone);
    setValue("isGold", customer.isGold);
    setValue("_id", customer._id);
  }, []);

  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    // console.log(data);
    // data._id
    //   ? dispatch(
    //       updateCustomer({
    //         _id: data._id,
    //         name: data.name,
    //         phone: data.phone,
    //         isGold: data.isGold,
    //       })
    //     )
    //   : dispatch(
    //       createCustomer({
    //         _id: nanoid(),
    //         name: data.name,
    //         phone: data.phone,
    //         isGold: data.isGold,
    //       })
    //     );
    // navigate("/customers");
    if (data._id) {
      dispatch(updateCustomer(data));
    } else {
      console.log("add here");
      dispatch(createCustomer(data));
    }
    navigate("/customers");
  };

  return (
    <div data-aos="fade-out">
      <h1 className="mt-5 ml-96 font-serif italic  font-bold hover:font-bold text-black text-4xl">
        Customer Form
      </h1>
      <div className="flex items-center justify-center my-3 ">
        <div className=" mt-16 block p-6 rounded-lg shadow-lg bg-white max-w-sm bg-gradient-to-tl from-orange-600 to-purple-500 border border-black">
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
                placeholder="Customer Name"
                {...register("name")}
              />
              <p className="text-red-900">{errors.name?.message}</p>
            </div>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control block
       w-full
         px-3
         py-1.5
         text-base
            font-normal
            text-black
            bg-white bg-clip-padding
              border border-black
              rounded
              transition
               ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput90"
                placeholder="Mobile Number"
                {...register("phone")}
              />
              <p className="text-red-900">{errors.phone?.message}</p>
            </div>
            <div className="flex justify-center">
              <div className="form-check">
                <label
                  for="remember_me"
                  className="inline-flex items-center w-full cursor-pointer"
                >
                  <input
                    id="remember_me"
                    type="checkbox"
                    className=" rounded border-black text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-black"
                    {...register("isGold")}
                  />
                  <span className="ml-2 text-base text-black font-bold font-serif">
                    IsGold
                  </span>
                </label>
                <p className="text-red-900">{errors.isGold?.message}</p>
              </div>
            </div>
            <br />
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
                                             animate-pulse"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
