import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5 * 1000,
	headers: { "Content-type": "application/json" },
});

export default api;
