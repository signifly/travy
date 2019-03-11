import * as utils from "./utils";

describe("utils", () => {
	test("rStringPropsDeep", () => {
		const data = utils.rStringPropsDeep({
			data: {
				id: 1,
				person: {name: "pete"}
			},
			obj: {
				objKey: {
					key: "{id}/{person.name}"
				},
				arrayKey: [
					"{id}/{person.name}",
					{key: "{id}/{person.name}"}
				]
			}
		});

		expect(data).toHaveProperty("objKey.key", "1/pete");
		expect(data).toHaveProperty(["arrayKey", 0], "1/pete");
		expect(data).toHaveProperty(["arrayKey", 1, "key"], "1/pete");
	});
});
