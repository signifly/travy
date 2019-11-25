<template>
	<div class="button-action">
		<action
			@event="$emit('event', $event)"
			v-bind="_action.actionType"
			v-model="active"
		>
			<div class="button-action">
				<Button
					@click="active = !active"
					:type="_action.status"
					:size="_action.size"
					:icon="_action.icon"
					plain
				>
					{{ _action.name }}
				</Button>
			</div>
		</action>
	</div>
</template>

<script>
import action from "@/components/actions";
import {Button} from "element-ui";

export default {
	components: {Button, action},
	meta: {
		spec: "props",
		res: {
			props: {
				_action: {
					status: "primary",
					name: "button",
					icon: "plus",
					size: "mini",
					actionType: {
						id: "dropdown",
						props: {
							actions: [
								{
									name: "Modal",
									actionType: {
										id: "modal",
										onSubmit: {
											url: "#button-action"
										},
										props: {
											name: "Modal title",
											endpoint: {
												method: "post",
												url: "/example"
											},
											fields: [
												{
													attribute: "1",
													name: "a field",
													fieldType: {
														id: "input-text",
														props: {
															value: "input"
														}
													}
												},
												{
													attribute: "2",
													name: "a field",
													fieldType: {
														id: "input-text",
														props: {
															value: "input2"
														}
													}
												}
											],
											payload: {
												data: {
													input: "32",
													input2: "34"
												}
											}
										}
									}
								}
							]
						}
					}
				}
			}
		}
	},
	props: {
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
	display: inline-block;
}
</style>
