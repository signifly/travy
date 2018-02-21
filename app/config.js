const config = {
	default: {
		api: "http://localhost/v1"
	},
	staging: {
		api: "https://api.sikane.signifly.com/v1"
	},
	production: {
		api: "https://api.sikane.signifly.com/v1"
	}
};

export default config[process.env.config];
