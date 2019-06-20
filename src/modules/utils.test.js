import * as utils from "./utils";

describe("utils", () => {
	test("rStringProps object", () => {
		const obj = utils.rStringProps({
			data: {
				id: 1,
				person: {name: "pete"}
			},
			val: {
				number: 1,
				null: null,
				boolean: true,
				objKey: {
					key: "{id}/{person.name}"
				},
				arrayKey: ["{id}/{person.name}", {key: "{id}/{person.name}"}]
			}
		});

		expect(obj).toHaveProperty("number", 1);
		expect(obj).toHaveProperty("null", null);
		expect(obj).toHaveProperty("boolean", true);
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

	test("mergeData", () => {
		const data = {
			obj: {
				key1: 1,
				key2: 1,
				key3: [{id: 1}, {id: 2}]
			}
		};

		const update = {
			obj: {
				key2: 2,
				key3: [{id: 3}]
			}
		};

		const merged = utils.mergeData(data, update);

		expect(merged).toHaveProperty("obj.key1", 1);
		expect(merged).toHaveProperty("obj.key2", 2);
		expect(merged).toHaveProperty("obj.key3", update.obj.key3);
	});
});
