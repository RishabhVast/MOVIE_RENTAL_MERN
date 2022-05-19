import axios from "../http.common";

const getAll = () => {
  return axios.get("/rentals");
};
const get = (id) => {
  return axios.get(`/rentals/${id}`);
};
const create = (data, token) => {
  return axios.post("/rentals", data, {
    headers: { "x-auth-token": token },
  });
};
const update = (id, data, token) => {
  return axios.patch(`/rentals/${id}`, data, {
    headers: { "x-auth-token": token },
  });
};
const remove = (id, token) => {
  return axios.delete(`/rentals/${id} `, {
    headers: { "x-auth-token": token },
  });
};

const rentalService = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default rentalService;
