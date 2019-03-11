import compSection from "./sections/section";
import {dashboard, table} from "@/test/data";
import {mount} from "@vue/test-utils";
import VueRouter from "vue-router";
const router = new VueRouter();
import {app} from "@/lib";

const instance = app({
	api: "https://localhost",
	test: true
});

let wrapper;


instance.$axios.get = (url) => {
	if (url === "/definitions") return Promise.resolve({
		data: dashboard.definitions
	});
	if (url === "/definitions/table") return Promise.resolve({
		data: table.definitions
	});
	if (url === "/data/table") return Promise.resolve({
		data: table.data
	});
	if (url === "/data/fields") return Promise.resolve({
		data: {client_id: 1, name: "Pete"}
	});
};


beforeEach(async () => {
	const {default: comp} = require("./page");

	wrapper = mount(comp, {
		router,
		propsData: {
			defsEndpoint: {url: "/definitions"}
		},
		stubs: { // element-ui fix
			transition: false
		}
	});

	await wrapper.vm.$nextTick();
});


describe("dashboard", () => {
	test("sections", () => {
		const sections = wrapper.findAll(compSection);
		expect(sections).toHaveLength(2);
	});
});
