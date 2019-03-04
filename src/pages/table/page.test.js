import tableData from "@/test/data/table";
import {mount} from "@vue/test-utils";
import VueRouter from "vue-router";
const router = new VueRouter();
import {app} from "@/lib";

app({
	api: "https://localhost",
	test: true
});

let wrapper;

beforeEach(async () => {
	const {default: comp} = require("./page");

	wrapper = mount(comp, {
		router,
		propsData: {
			defsEndpoint: {url: "/definitions"},
			title: "Projects"
		},
		stubs: { // element-ui fix
			transition: false
		},
		mocks: {
			$axios: {
				get: (url) => {
					if (url === "/definitions") return Promise.resolve({
						data: tableData.definitions
					});

					if (url === "/data") return Promise.resolve({
						data: tableData.data
					});
				}
			}
		}
	});

	await wrapper.vm.$nextTick();
});


describe("table page", () => {
	test("get definitions", () => {
		expect(wrapper.vm.definitions).toBe(tableData.definitions);
	});
	test("get data", async () => {
		expect(wrapper.vm.data).toBe(tableData.data.data);
		expect(wrapper.vm.meta).toBe(tableData.data.meta);
	});
});
