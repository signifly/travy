import {mount} from "@vue/test-utils";
import Comp from "./index";
import Vue from "vue";

const propsData = {
	onSubmit: {
		url: "https://localhost/{obj.id}"
	},
	value: true,
	id: "confirm",
	data: {
		value: 1,
		obj: {show: true, id: 1}
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
	test("show", () => {
		const wrapper = mount(Comp, {propsData});

		wrapper.setProps({
			show: [
				{
					key: "{obj.show}",
					operator: "eq",
					value: true
				}
			]
		});

		expect(wrapper.vm.Show).toBe(true);
	});
});
