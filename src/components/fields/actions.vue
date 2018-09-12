<template>
	<div class="actions">
		<Dropdown ref="dropdown" trigger="click" :show-timeout="0" :hide-timeout="0" :hide-on-click="false" size="small" @command="select">
			<a class="el-dropdown-link">Actions</a>

			<DropdownMenu slot="dropdown">
				<action
				v-bind="[action, {data: alt.data}]"
				:active="selectedAction === action"
				v-for="action in actions"
				@close="close"
				@fieldA="fieldA"
				:key="action.title">

					<DropdownItem class="item" :command="action">
						{{action.title}}
					</DropdownItem>

				</action>
			</DropdownMenu>
		</Dropdown>
	</div>
</template>

<script>
import {get} from "lodash";
import {Dropdown, DropdownMenu, DropdownItem} from "element-ui";
import action from "@/components/actions/index.vue";

export default {
	components: {Dropdown, DropdownMenu, DropdownItem, action},
	meta: {
		res: {
			props: {
				actions: [
					{
						title: "Remove",
						props: {
							text: "Remove this item?"
						},
						hide: {
							key: "is_hidden",
							operator: "eq",
							value: 12
						}
					},
					{
						title: "Delete",
						endpointId: "destroy",
						props: {
							id: "popup",
							endpoint: {
								method: "delete",
								url: "https://example.com"
							},
							text: "delete this?",
							onSubmit: "https://example.com",
						}
					},
					{
						title: "View",
						props: {
							id: "show",
							endpoint: {
								method: "get",
								url: "https://example.com"
							}
						}
					},
					{
						title: "Edit",
						props: {
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
					}
				]
			},
			data: {

			}
		}
	},
	props: {
		_actions: {type: Array, required: true, doc: true},
		alt: {type: Object, default: () => ({})}
	},
	data() {
		return {
			actions: this._actions,
			selectedAction: null
		}
	},
	methods: {
		select(action) {
			this.selectedAction = this.selectedAction ? null : action;
		},

		close() {
			this.selectedAction = null;

			setTimeout(() => {
				if (this.$refs.dropdown) this.$refs.dropdown.hide();
			}, 100);
		},

		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.actions {
	position: relative;
	display: inline-block;

	.el-dropdown-link {
		user-select: none;
		font-size: em(14);
		color: $blue5;
	}
}

.item {
	user-select: none;
}
</style>
