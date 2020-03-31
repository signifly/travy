import * as utils from "./utils";

describe("utils", () => {
	test("transProps", () => {
		const obj = utils.transProps({
			val: {
				scoped: {
					parentId: "{$parent.id}",
					"@scope": "items",
					id: "{id}"
				},
				obj: {name: "id: {id}", rec: "{rec}"},
				arr: [{id: "{id}", deepArr: [{id: "{id}"}]}],
				id: "{id}",
				null: null
			},

			data: {
				id: 1,
				rec: "{id}",
				items: [{id: 2, text: "text"}]
			}
		});

		expect(obj).toEqual({
			scoped: [{parentId: 1, id: 2}],
			obj: {name: "id: 1", rec: 1},
			arr: [{id: 1, deepArr: [{id: 1}]}],
			id: 1,
			null: null
		});

		const string = utils.transProps({
			val: "endpoint/{id}/{uuid}",
			data: {id: 1, uuid: 2}
		});

		expect(string).toEqual("endpoint/1/2");
	});

	test("mergeData", () => {
		const res = utils.mergeData(
			{
				obj: {
					key1: 1,
					key2: 1,
					key3: [{id: 1}, {id: 2}],
					key4: 4
				}
			},
			{
				obj: {
					key2: 2,
					key3: [{id: 3}],
					key4: undefined,
					key5: 5
				}
			}
		);

		expect(res).toEqual({
			obj: {
				key1: 1,
				key2: 2,
				key3: [{id: 3}],
				key4: undefined,
				key5: 5
			}
		});
	});

	test("mapPaths", () => {
		const res = utils.mapPaths({
			text: "text",
			"obj.text": "text"
		});

		expect(res).toEqual({
			text: "text",
			obj: {text: "text"}
		});
	});
});
