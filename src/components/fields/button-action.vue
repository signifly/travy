<template>
	<action
	v-bind="{props: _action, data: alt.data, active}"
	@close="close"
	@fieldA="fieldA">

		<div class="button-action">
			<Button size="medium" :type="_status" :icon="`el-icon-${_icon}`" @click="active = true">{{_title}}</Button>
		</div>
	</action>
</template>

<script>
import {Button} from "element-ui";
import action from "@/components/actions";

export default {
	components: {Button, action},
	meta: {
		res: {
			props: {
				title: "button",
				icon: "plus",
				status: "primary",
				action: {
					id: "modal",
					title: "Modal title",
					onSubmit: "#vActions",
					endpoint: {
						method: "post",
						url: "https://example.com"
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
		alt: {type: Object, default: () => ({})},
		_title: {type: String, required: true, doc: true},
		_icon: {type: String, required: false, doc: true},
		_status: {type: String, required: false, doc: true},
		_action: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			active: false
		}
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

}
</style>
