<template>
	<div class="actions">
		<Dropdown trigger="click" :show-timeout="0" :hide-timeout="0" size="small" @command="select">
			<a class="el-dropdown-link">Actions</a>

			<DropdownMenu slot="dropdown" v-if="!action">
				<DropdownItem v-for="action in actions" :key="action.title" :command="action">
					{{action.title}}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>

		<component
			v-if="action"
			:is="action.props.id"
			v-bind="action.props"
			:endpoint="endpoint"
			:data="data"
			@close="close"
			@submit="submit"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import {get} from "lodash";
import {Dropdown, DropdownMenu, DropdownItem} from "element-ui";
import * as actions from "@/components/actions";

export default {
	components: {Dropdown, DropdownMenu, DropdownItem, ...actions},
	meta: {
		res: {
			props: {
				actions: [
					{
						title: "Remove",
						props: {
							text: "Remove this item?"
						}
					},
					{
						title: "Delete",
						endpointId: "destroy",
						props: {
							id: "popup",
							text: "delete this?",
							onSubmit: "#vActions",
						}
					},
					{
						title: "View",
						props: {
							id: "show",
							endpoint: {
								method: "show",
								url: "#vActions"
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
					}
				]
			},
			data: {

			}
		}
	},
	props: {
		_actions: {type: Array, required: true, doc: true, note: `
			Every action needs endpointId or props.endpoint. <br>
			if only endpointId is supplied,<br>
			It'll use the endpoint from table/view definition endpoints.
		`},
		endpoints: {type: Object, required: false},
		data: {type: Object, required: false}
	},
	data() {
		return {
			actions: this._actions,
			action: null
		}
	},
	computed: {
		endpoint: (t) => t.action.props.endpoint || get(t.endpoints, t.action.endpointId)
	},
	methods: {
		select(action) {
			this.action = action;
		},

		close() {
			this.action = null;
		},
		submit({id}) {
			this.$emit("fieldA", {action: "getData"});
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
</style>
