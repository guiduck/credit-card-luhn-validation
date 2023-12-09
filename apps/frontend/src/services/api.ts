import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5001/",
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem("userToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 400) {
      //   snackbar("There was an error with your request :(", 3000);
    }

    return Promise.reject(error);
  }
);

export default api;
