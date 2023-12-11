import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001/";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

/* api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 400) {
      //   snackbar("There was an error with your request :(", 3000);
    }

    return Promise.reject(error);
  }
); */

export default api;
