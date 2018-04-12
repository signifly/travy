const proxy = require("http-proxy-middleware");
const express = require("express");
const config = require("./config");

const app = express();

app.use("/api", proxy({
	target: config.api,
	changeOrigin: true,
	pathRewrite: {
		"^/api": "/"
	}
}));

app.use("/", express.static(__dirname + "/dist"));

app.get("/*", (req, res) => {
	res.sendFile(__dirname + "/dist/index.html");
});

app.listen(80, () => console.log("server ready"));
