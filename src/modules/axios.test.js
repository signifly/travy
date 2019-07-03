import axios from "axios";

describe("axios", () => {
	test("custom parameters", async () => {
		const api = axios.create();

		api.interceptors.request.use((config) => {
			throw {config};
		});

		api.interceptors.response.use(
			(res) => res,
			(err) => {
				expect(err.config).toHaveProperty("customParam", true);
			}
		);

		await api.get("test", {customParam: true});
	});
});
