<template>
	<action
		v-bind="{props: _action, data: alt.data}"
		v-model="active"
		@event="$emit('event', $event)"
	>
		<div class="button-action">
			<Button
				plain
				:size="_size"
				:type="_status"
				:icon="icon"
				@click="active = !active"
			>
				{{ _title }}
			</Button>
		</div>
	</action>
</template>

<script>
import {Button} from "element-ui";
import action from "@/components/actions";

export default {
	components: {Button, action},
	meta: {
		spec: "props",
		res: {
			props: {
				status: "primary",
				_title: "button",
				icon: "plus",
				size: "mini",
				_action: {
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
			data: {}
		}
	},
	props: {
		alt: {type: Object, default: () => ({})},
		_size: {
			type: String,
			default: "medium",
			note: `medium/small/mini`
		},
		_status: {type: String, default: "primary"},
		_title: {type: String, required: true},
		_icon: {type: String, required: false},
		_action: {type: Object, required: true}
	},
	data() {
		return {
			active: false
		};
	},
	computed: {
		icon: (t) => (t._icon ? `el-icon-${t._icon}` : "")
	}
};
</script>

<style lang="scss" scoped>
.button-action {
}
</style>
