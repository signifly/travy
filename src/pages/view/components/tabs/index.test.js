import {shallowMount} from "@vue/test-utils";
import {TabPane} from "element-ui";
const comp = TabPane;

describe("tabs", () => {
	test("element-ui TabPane", () => {
		const wrapper = shallowMount(comp);
		expect(wrapper.vm.loaded).toBe(false);
	});
});
