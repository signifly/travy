<template>
	<div class="button-action">
		<action
			@event="$emit('event', $event)"
			v-bind="_action.actionType"
			v-model="active"
			:data="data"
		>
			<div class="button-action">
				<Button
					@click="active = !active"
					:type="_action.status"
					:size="_action.size"
					plain
				>
					{{ _action.name }}
					<i
						:class="`el-icon-${_action.icon}`"
						class="el-icon-right"
						v-if="_action.icon"
					/>
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
				data: "$root",
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
		_action: {type: Object, required: true, note: "see actions"},
		data: {type: Object, required: true, note: "$root"}
	},
	data() {
		return {
			active: false
		};
	}
};
</script>

<style lang="scss" scoped>
.button-action {
	display: inline-block;
}
</style>
