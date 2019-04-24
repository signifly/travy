import {mount} from "@vue/test-utils";
import compPopup from "./popup";
import comp from "./index";
import {app} from "@/lib";

app({
	api: "https://localhost",
	test: true
});

const propsData = {
	active: true,
	data: {
		value: 1,
		obj: {isHidden: true, id: 1}
	},
	props: {
		id: "popup",
		onSubmit: "https://localhost/{obj.id}",
		endpoint: {
			method: "post",
			url: "https://localhost/{obj.id}"
		},
		payload: {
			type: "aType",
			data: {id: "obj.id", value: 2}
		}
	}
};

describe("action", () => {
	test("active", () => {
		const wrapper = mount(comp, {propsData});
		expect(wrapper.contains(compPopup)).toBe(true);
	});

	test("hide", () => {
		const wrapper = mount(comp, {propsData});

		wrapper.setProps({
			hide: {
				key: "obj.isHidden",
				operator: "eq",
				value: true
			}
		});

		expect(wrapper.vm.disabled).toBe(true);
		expect(wrapper.contains(compPopup)).toBe(false);
	});

	test("propsC", () => {
		const wrapper = mount(comp, {propsData});

		// dataComb
		expect(wrapper.vm.propsC).toHaveProperty("payload.data.value", 2);

		// payload map values
		expect(wrapper.vm.propsC).toHaveProperty("payload.data.id", 1);

		// endpoint
		expect(wrapper.vm.propsC).toHaveProperty(
			"endpoint.url",
			"https://localhost/1"
		);

		// onSubmit
		expect(wrapper.vm.propsC).toHaveProperty("onSubmit", "https://localhost/1");
	});
});
