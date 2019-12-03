import fg from "fast-glob";
import fs from "fs";

describe("env", () => {
	test("api", (done) => {
		const stream = fg.stream([
			"!src/**/*.test.js",
			"!src/main.js",
			"src/**/*.vue",
			"src/**/*.js"
		]);

		stream.on("data", (file) => {
			fs.readFile(file, "utf8", (err, data) => {
				if (data.includes("process.env.API")) {
					throw `${file} has instance of process.env.API`;
				}
			});
		});

		stream.once("end", done);
	});
});
