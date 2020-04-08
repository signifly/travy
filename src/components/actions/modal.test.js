import {mount} from "@vue/test-utils";
import Comp from "./index";
import Vue from "vue";

const propsData = {
	onSubmit: {
		url: "https://localhost/{obj.id}"
	},
	value: true,
	id: "modal",
	data: {
		value: 1,
		obj: {id: 1}
	},
	props: {
		fields: [
			{
				name: "field",
				fieldType: {
					id: "input-text",
					props: {
						value: "{input}"
					}
				}
			}
		],
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

describe("modal", () => {
	test("no transform", async () => {
		const wrapper = mount(Comp, {propsData});
		await Vue.nextTick();

		const modal = wrapper.vm.$children[0];

		// test that fields is not transformed
		expect(modal._props).toHaveProperty(
			["fields", 0, "fieldType", "props", "value"],
			"{input}"
		);
	});

	test("transform", async () => {
		const wrapper = mount(Comp, {propsData});
		await Vue.nextTick();

		const modal = wrapper.vm.$children[0];

		expect(modal._data).toHaveProperty("modalData.id", 1);
	});

	test("disableSubmit", async () => {
		const wrapper = mount(Comp, {propsData});
		await Vue.nextTick();

		const modal = wrapper.vm.$children[0];

		expect(modal.disabled).toBe(false);

		wrapper.setProps({
			props: {
				...propsData.props,
				disableSubmit: [{key: "{value}", operator: "eq", value: 2}]
			}
		});

		expect(modal.disabled).toBe(true);
	});
});
