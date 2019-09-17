const fastify = require("fastify")({logger: false});
const cors = require("fastify-cors");
const data = require("./data");

fastify.register(cors);

fastify.register(
	async (instance, opts) => {
		Object.entries(data).forEach(([key, val]) => {
			instance.get(key, async (req, res) => val);
			instance.post(key, async (req, res) => val);
		});
	},
	{
		prefix: "/v1/admin"
	}
);

fastify.listen(3001, "::", () => {
	console.log("api ready");
});
