const env = process.env.env || "local";

const config = {
	local: {
		api: "http://localhost"
	},
	staging: {
		api: "https://api.sikane.signifly.com"
	},
	production: {
		api: "https://api.sikane.signifly.com"
	}
};

module.exports = config[env];
