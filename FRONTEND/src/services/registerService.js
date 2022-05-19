import axios from "../http.common";

const getAll = () => {
  return axios.get("/users");
};
const get = (id) => {
  return axios.get(`/users/${id}`);
};
const create = (data) => {
  return axios.post("/users", data);
};

const registerService = {
  getAll,
  get,
  create,
};
export default registerService;
