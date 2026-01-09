import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      window.location.href = "/auth";
    }
    return Promise.reject(err);
  }
);
