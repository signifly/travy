import * as utils from "./utils";

describe("utils", () => {
	test("rStringProps object", () => {
		const res = utils.rStringProps({
			data: {
				id: 1,
				person: {name: "pete"}
			},
			val: {
				number: 1,
				null: null,
				boolean: true,
				obj: {
					key: "{id}/{person.name}"
				},
				array: [
					"{id}/{person.name}",
					{key: "{id}/{person.name}"},
					{deepArr: [{id: "id: {id}"}]}
				]
			}
		});

		expect(res).toEqual({
			number: 1,
			null: null,
			boolean: true,
			obj: {key: "1/pete"},
			array: ["1/pete", {key: "1/pete"}, {deepArr: [{id: "id: 1"}]}]
		});
	});

	test("rStringProps string", () => {
		const res = utils.rStringProps({
			data: {id: 1},
			val: "test/{id}"
		});

		expect(res).toBe("test/1");
	});

	test("mergeData", () => {
		const res = utils.mergeData(
			{
				obj: {
					key1: 1,
					key2: 1,
					key3: [{id: 1}, {id: 2}]
				}
			},
			{
				obj: {
					key2: 2,
					key3: [{id: 3}],
					key4: 4
				}
			}
		);

		expect(res).toEqual({
			obj: {
				key1: 1,
				key2: 2,
				key3: [{id: 3}],
				key4: 4
			}
		});
	});

	test("mapProps", () => {
		const res = utils.mapProps({
			props: {
				scope: {
					rootId: "$root.id",
					"@scope": "scope",
					id: "id"
				},
				obj: {_text: "text"},
				_obj: {text: "text"},
				array: [{id: "id", deepArr: [{id: "id"}]}],
				_array: [{id: 2, deepArr: [{id: 2}]}],
				id: "id",
				_null: null,
				nothing: "nothing"
			},

			data: {
				id: 1,
				scope: [{id: 2, text: "text", rootId: "$root.id"}]
			}
		});

		expect(res).toEqual({
			scope: [{"@scope": "scope", rootId: 1, id: 2}],
			obj: {_text: "text"},
			_obj: {text: "text"},
			array: [{id: 1, deepArr: [{id: 1}]}],
			_array: [{id: 2, deepArr: [{id: 2}]}],
			id: 1,
			_null: null,
			nothing: undefined
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
