import axios from "axios";

const api = axios.create({
	baseURL: `${process.env.API}/v1`
});

export default api;
