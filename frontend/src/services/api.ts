import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`,
=======
  baseURL: "http://localhost:5000/api",
>>>>>>> 4ea3bf70174b0f06a3f0916e91d133fcaca16d98
});

export default api;