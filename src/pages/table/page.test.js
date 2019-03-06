import {mount} from "@vue/test-utils";
import VueRouter from "vue-router";
import {table} from "@/test/data";
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
			title: {text: "Projects"}
		},
		stubs: { // element-ui fix
			transition: false
		},
		mocks: {
			$axios: {
				get: (url) => {
					if (url === "/definitions") return Promise.resolve({
						data: table.definitions
					});

					if (url === "/data/table") return Promise.resolve({
						data: table.data
					});
				}
			}
		}
	});

	await wrapper.vm.$nextTick();
});


describe("table", () => {
	test("get definitions", () => {
		expect(wrapper.vm.definitions).toBe(table.definitions);
	});
	test("get data", async () => {
		expect(wrapper.vm.data).toBe(table.data.data);
		expect(wrapper.vm.meta).toBe(table.data.meta);
	});
});
