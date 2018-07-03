<template>
	<div class="button-action">
		<Button size="medium" :type="_type" :icon="`el-icon-${_icon}`" @click="active = true">{{_title}}</Button>

		<component
			v-if="active"
			:is="_action.id"
			v-bind="_action"
			:alt="alt"
			@close="close"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import {get} from "lodash";
import {Button} from "element-ui";
import * as actions from "@/components/actions";

export default {
	components: {Button, ...actions},
	meta: {
		res: {
			props: {
				title: "button",
				icon: "plus",
				type: "primary",
				action: {
					id: "modal",
					title: "Modal title",
					onSubmit: "#vActions",
					endpoint: {
						method: "destroy",
						url: "destroy"
					},
					fields: [
						{
							name: "1",
							label: "a field",
							fieldType: {
								id: "vInput",
								props: {
									value: "input"
								}
							}
						},
						{
							name: "2",
							label: "a field",
							fieldType: {
								id: "vInput",
								props: {
									value: "input2"
								}
							}
						}
					],
					data: {
						input: "32",
						input2: "34"
					}
				}
			},
			data: {

			}
		}
	},
	props: {
		alt: {type: Object, required: true},
		_title: {type: String, required: true, doc: true},
		_icon: {type: String, required: false, doc: true},
		_type: {type: String, required: false, doc: true},
		_action: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			active: false
		}
	},
	computed: {
		endpoint: (t) => t._action.endpoint || get(t.alt.endpoints, t._action.endpointId)
	},
	methods: {
		close() {
			this.active = false;
		},

		submit() {
			this.close();
			this.$emit("fieldA", {action: "getData"});
		},

		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.button-action {
	position: relative;
}
</style>
