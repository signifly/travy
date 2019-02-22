import {mount} from "@vue/test-utils";
import comp from "./menu";

describe("action", () => {
	test("hide", () => {
		const wrapper = mount(comp, {
			mocks: {
				$route: {path: "/"},
				$store: {getters: {"config/menu": []}}
			}
		});

		expect(wrapper.isVueInstance()).toBeTruthy();
	});
});
