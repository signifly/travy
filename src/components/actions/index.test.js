import {mount} from "@vue/test-utils";
import comp from "./index";

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
			type: "aType",
			data: {id: "{obj.id}", value: 2}
		}
	}
};

describe("action", () => {
	test("hide", () => {
		const wrapper = mount(comp, {
			propsData
		});

		wrapper.setProps({
			hide: {
				key: "obj.isHidden",
				operator: "eq",
				value: true
			}
		});

		expect(wrapper.vm.disabled).toBe(true);
	});

	test("propsC", () => {
		const wrapper = mount(comp, {propsData});

		// dataComb
		expect(wrapper.vm.propsC).toHaveProperty("payload.data.value", 2);

		// payload map values
		expect(wrapper.vm.propsC).toHaveProperty("payload.data.id", "1");

		// endpoint
		expect(wrapper.vm.propsC).toHaveProperty(
			"endpoint.url",
			"https://localhost/1"
		);
	});
});
