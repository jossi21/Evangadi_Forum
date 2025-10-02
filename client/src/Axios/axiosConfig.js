import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://localhost:2127/api",
});

export default baseAxios;
