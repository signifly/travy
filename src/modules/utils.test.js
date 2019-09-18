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
				array: ["{id}/{person.name}", {key: "{id}/{person.name}"}]
			}
		});

		expect(res).toEqual({
			number: 1,
			null: null,
			boolean: true,
			obj: {key: "1/pete"},
			array: {"0": "1/pete", "1": {key: "1/pete"}}
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

		const res = utils.mergeData(data, update);

		expect(res).toEqual({
			obj: {
				key1: 1,
				key2: 2,
				key3: [{id: 3}]
			}
		});
	});

	test("mapProps", () => {
		const props = {
			scope: {
				rootId: "$root.id",
				"@scope": "scope",
				id: "id"
			},
			obj: {_text: "text"},
			_obj: {text: "text"},
			array: [{id: "id"}],
			_array: [{id: 2}],
			id: "id",
			_null: null,
			nothing: "nothing"
		};

		const data = {
			id: 1,
			scope: [{id: 2, text: "text", rootId: "$root.id"}]
		};

		const res = utils.mapProps({props, data});

		expect(res).toEqual({
			scope: [{"@scope": "scope", rootId: 1, id: 2}],
			obj: {_text: "text"},
			_obj: {text: "text"},
			array: [{id: 1}],
			_array: [{id: 2}],
			id: 1,
			_null: null,
			nothing: undefined
		});
	});

	test("mapPaths", () => {
		const data = {
			text: "text",
			"obj.text": "text"
		};

		const res = utils.mapPaths(data);

		expect(res).toEqual({
			text: "text",
			obj: {text: "text"}
		});
	});
});
