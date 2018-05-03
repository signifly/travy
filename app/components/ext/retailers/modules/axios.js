import axios from "axios";

const api = axios.create({
	baseURL: `${process.env.api}/v1`
});

export default api;
