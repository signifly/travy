const fastify = require("fastify")({logger: false});
const cors = require("fastify-cors");
const data = require("./data");

// allow uploades
fastify.addContentTypeParser("*", (req, done) => done());
fastify.register(cors);

fastify.register(async (instance, opts) => {
	instance.get("/", async (req, res) => data);

	Object.entries(data).forEach(([key, val]) => {
		["get", "put", "post", "delete"].forEach((x) => {
			instance[x](key, async (req, res) => {
				await new Promise((res) => setTimeout(res, 50));
				return val;
			});
		});
	});
});

fastify.listen(3001, "::", () => {
	console.log("api ready");
});
