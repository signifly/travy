const fastify = require("fastify")({logger: false});
const cors = require("fastify-cors");
const data = require("./data");

fastify.register(cors);

fastify.register(
	async (instance, opts) => {
		Object.entries(data).forEach(([key, val]) => {
			["get", "put", "post"].forEach((x) => {
				instance[x](key, async (req, res) => {
					await new Promise((res) => setTimeout(res, 50));
					return val;
				});
			});
		});
	},
	{
		prefix: "/v1/admin"
	}
);

fastify.listen(3001, "::", () => {
	console.log("api ready");
});
