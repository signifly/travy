import {shallowMount} from "@vue/test-utils";
import comp from "./modal";

const propsData = {
	title: "modal",
	endpoint: {
		method: "post",
		url: "https://localhost/post"
	},
	payload: {
		type: "aType",
		data: {
			"deep.input": "deep",
			input: "input"
		}
	},
	fields: [
		{
			name: "name",
			label: "Name",
			fieldType: {
				id: "input-text",
				props: {
					value: "input"
				}
			}
		}
	]
};

describe("modal", () => {
	test("propsC", () => {
		const wrapper = shallowMount(comp, {propsData});
		const payloadC = wrapper.vm.payloadC;

		expect(payloadC).toHaveProperty("type");
		expect(payloadC).toHaveProperty("data.input");
		expect(payloadC).toHaveProperty("data.deep.input");
		expect(payloadC).not.toHaveProperty(["data", "deep.input"]);
	});
});
