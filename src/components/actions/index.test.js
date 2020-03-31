import {mount} from "@vue/test-utils";
import Comp from "./index";
import Vue from "vue";

const propsData = {
	onSubmit: {
		url: "https://localhost/{obj.id}"
	},
	value: true,
	id: "popup",
	data: {
		value: 1,
		obj: {isHidden: true, id: 1}
	},
	props: {
		endpoint: {
			method: "post",
			url: "https://localhost/{obj.id}"
		},
		payload: {
			type: "a type",
			data: {id: "{obj.id}", value: 2}
		}
	}
};

describe("action", () => {
	test("hide", () => {
		const wrapper = mount(Comp, {propsData});

		wrapper.setProps({
			hide: {
				key: "{obj.isHidden}",
				operator: "eq",
				value: true
			}
		});

		expect(wrapper.vm.disabled).toBe(true);
	});
});
