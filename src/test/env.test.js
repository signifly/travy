import fg from "fast-glob";
import fs from "fs";

describe("env", () => {
	test("api", async () => {
		const files = await fg([
			"!src/**/*.test.js",
			"!src/main.js",
			"src/**/*.vue",
			"src/**/*.js"
		]);

		files.forEach((file) => {
			const data = fs.readFileSync(file, "utf8");
			expect(data.includes("process.env.API")).toBe(false);
		});
	});
});
