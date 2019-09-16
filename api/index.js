const fastify = require("fastify")({logger: false});
const data = require("./data");

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

fastify.listen(3000, "::", () => {
	console.log("api ready");
});
