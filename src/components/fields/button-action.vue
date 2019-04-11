<template>
	<action
	v-bind="{props: _action, data: alt.data, active}"
	@close="close"
	@event="$emit('event', $event)">

		<div class="button-action">
			<Button :size="_size" :type="_status" :icon="icon" @click="toggle" plain>{{_title}}</Button>
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
				size: "mini",
				status: "primary",
				action: {
					id: "modal",
					title: "Modal title",
					onSubmit: "#button-action",
					endpoint: {
						method: "post",
						url: "https://example.com",
						params: {}
					},
					fields: [
						{
							name: "1",
							label: "a field",
							fieldType: {
								id: "input-text",
								props: {
									value: "input"
								}
							}
						},
						{
							name: "2",
							label: "a field",
							fieldType: {
								id: "input-text",
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
		_size: {type: String, default: "medium", doc: true, note: `medium/small/mini`},
		_status: {type: String, default: "primary", doc: true},
		_title: {type: String, required: true, doc: true},
		_icon: {type: String, required: false, doc: true},
		_action: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			active: false
		}
	},
	computed: {
		icon: (t) => t._icon ? `el-icon-${t._icon}` : ""
	},
	methods: {
		toggle() {
			this.active = !this.active;
		},

		close() {
			this.active = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.button-action {

}
</style>
