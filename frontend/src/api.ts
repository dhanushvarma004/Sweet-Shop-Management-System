import axios from "axios";

// Adjust this to your backend’s running port (e.g., 5000 or 3000)
const api = axios.create({
  baseURL: "http://localhost:5000/api", 
});

export default api;
