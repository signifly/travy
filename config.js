const env = process.env.env || "local";

const config = {
	local: {
		api: "http://localhost",
		path: "/v1"
	},
	staging: {
		api: "https://api.sikane.signifly.com",
		path: "/v1"
	},
	production: {
		api: "https://api.sikane.signifly.com",
		path: "/v1"
	}
};

module.exports = config[env];
