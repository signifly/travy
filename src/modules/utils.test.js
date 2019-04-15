import * as utils from "./utils";

describe("utils", () => {
	test("rStringProps object", () => {
		const obj = utils.rStringProps({
			data: {
				id: 1,
				person: {name: "pete"}
			},
			val: {
				objKey: {
					key: "{id}/{person.name}"
				},
				arrayKey: ["{id}/{person.name}", {key: "{id}/{person.name}"}]
			}
		});

		expect(obj).toHaveProperty("objKey.key", "1/pete");
		expect(obj).toHaveProperty(["arrayKey", 0], "1/pete");
		expect(obj).toHaveProperty(["arrayKey", 1, "key"], "1/pete");
	});

	test("rStringProps string", () => {
		const string = utils.rStringProps({
			data: {id: 1},
			val: "test/{id}"
		});

		expect(string).toBe("test/1");
	});
});
