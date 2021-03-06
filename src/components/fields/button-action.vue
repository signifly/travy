<template>
	<div class="button-action">
		<template v-if="show">
			<action
				@event="$emit('event', $event)"
				v-bind="action.actionType"
				v-model="active"
				:data="__data"
			>
				<div class="button-action">
					<Button
						@click="active = !active"
						:type="action.status"
						:size="action.size"
						plain
					>
						{{ action.name }}
						<i :class="`el-icon-${action.icon}`" v-if="action.icon" />
					</Button>
				</div>
			</action>
		</template>
		<template v-else>
			––
		</template>
	</div>
</template>

<script>
import action from "@/components/actions";
import {operator} from "@/modules/utils";
import {Button} from "element-ui";

export default {
	components: {Button, action},
	meta: {
		spec: {
			action: {type: Object, required: true, note: "see actions"}
		},
		res: {
			props: {
				action: {
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
										props: {
											name: "Modal title",
											endpoint: {
												method: "post",
												url: "/example"
											},
											fields: [
												{
													name: "a field",
													fieldType: {
														id: "input-text",
														props: {
															value: "{input}"
														}
													}
												},
												{
													name: "a field",
													fieldType: {
														id: "input-text",
														props: {
															value: "{input2}"
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
		__props: {type: Object, required: true},
		__data: {type: Object, required: false}
	},
	data() {
		return {
			active: false
		};
	},
	computed: {
		action: (t) => t.__props.action,
		show() {
			if (this.action.actionType.id !== "dropdown") {
				return true;
			}
			const actions = this.action.actionType.props.actions;
			return actions
				.flatMap((action) => {
					if (!action.actionType.show) return true;
					return action.actionType.show.some((x) =>
						operator({...x, data: this.__data})
					);
				})
				.some((x) => x);
		}
	}
};
</script>

<style lang="scss" scoped>
.button-action {
	display: inline-block;
}
</style>
