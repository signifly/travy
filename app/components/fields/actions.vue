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
			:rootData="data"
			@close="action = null"
		/>
	</div>
</template>

<script>
import {get} from "lodash";
import {Dropdown, DropdownMenu, DropdownItem} from "element-ui";
import * as actions from "@/components/actions2";

export default {
	components: {Dropdown, DropdownMenu, DropdownItem, ...actions},
	meta: {
		res: {
			props: {
				actions: [
					{
						title: "Delete",
						props: {
							id: "delete",
							text: "delete this?"
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
		endpoints: {type: Object, required: true},
		data: {type: Object, required: false}
	},
	data() {
		return {
			actions: this._actions,
			action: null
		}
	},
	computed: {
		endpoint: (t) => t.endpoints[t.action.endpointId]
	},
	methods: {
		select(action) {
			this.action = action;
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
