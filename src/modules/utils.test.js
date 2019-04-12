import * as utils from "./utils";

describe("utils", () => {
	test("rStringProps", () => {
		const dataObject = utils.rStringProps({
			data: {
				id: 1,
				person: {name: "pete"}
			},
			val: {
				objKey: {
					key: "{id}/{person.name}"
				},
				arrayKey: [
					"{id}/{person.name}",
					{key: "{id}/{person.name}"}
				]
			}
		});

		expect(dataObject).toHaveProperty("objKey.key", "1/pete");
		expect(dataObject).toHaveProperty(["arrayKey", 0], "1/pete");
		expect(dataObject).toHaveProperty(["arrayKey", 1, "key"], "1/pete");


		const dataString = utils.rStringProps({
			data: {
				id: 1
			},
			val: "test/{id}"
		});

		expect(dataString).toBe("test/1");
	});
});
