import axios from "../http.common";

const getAll = () => {
  return axios.get("/movies");
};

const getCount = (genreName) => {
  return axios.get("/movies/count?genreName=" + genreName);
};

const get = (id) => {
  return axios.get(`/movies/${id}`);
};
const create = (data, token) => {
  return axios.post("/movies", data, {
    headers: { "x-auth-token": token },
  });
};

const pagination = (data) => {
  return axios.post("/movies/pfs", data);
};

const update = (id, data, token) => {
  return axios.put(`/movies/${id}`, data, {
    headers: { "x-auth-token": token },
  });
};
const remove = (id, token) => {
  console.log(id);
  return axios.delete(`/movies/${id} `, { headers: { "x-auth-token": token } });
};

const movieService = {
  getAll,
  get,
  create,
  update,
  remove,
  getCount,
  pagination,
};
export default movieService;
