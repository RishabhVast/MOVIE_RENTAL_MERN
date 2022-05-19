import axios from "../http.common";

const getAll = () => {
  return axios.get("/genres");
};
const get = (id) => {
  return axios.get(`/genres/${id}`);
};
const create = (data, token) => {
  return axios.post("/genres", data, {
    headers: { "x-auth-token": token },
  });
};
const update = (id, data, token) => {
  return axios.put(`/genres/${id}`, data, {
    headers: { "x-auth-token": token },
  });
};
const remove = (id, token) => {
  console.log(id);
  return axios.delete(`/genres/${id} `, { headers: { "x-auth-token": token } });
};

const genreService = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default genreService;
