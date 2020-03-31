import data from "../../../../../api/data";
import {shallowMount} from "@vue/test-utils";

let wrapper;

beforeEach(async () => {
	const {default: comp} = require("./index");

	wrapper = shallowMount(comp, {
		propsData: {
			definitions: data["/definitions/index/projects"].tabs[0].definitions,
			parentData: {}
		},
		stubs: {
			transition: false
		},
		mocks: {
			$axios: {
				get: (url) => {
					if (url === "/projects") {
						return Promise.resolve({
							data: data["/projects"]
						});
					}
				}
			}
		}
	});
});

describe("table", () => {
	test("get data", async () => {
		expect(wrapper.vm.data).toEqual(
			data["/projects"].data.map((x) => ({...x, $parent: {}}))
		);
	});
});
