import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users",
});

export default instance;
