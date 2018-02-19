<template>
	<div class="actions">
		<Dropdown trigger="click" :show-timeout="0" :hide-timeout="0" size="small" @command="click">
			<a class="el-dropdown-link">Actions</a>

			<DropdownMenu slot="dropdown" v-if="!item">
				<DropdownItem v-for="item in actions" :key="item.title" :command="item">
					{{item.title}}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>

		<component v-if="component" :is="component" v-bind="{item}" @close="item = null" />
	</div>
</template>

<script>
import {get} from "lodash";
import {Dropdown, DropdownMenu, DropdownItem, Popover, Button} from "element-ui";
import vDelete from "./delete.vue";
import vShow from "./show.vue";

export default {
	components: {Dropdown, DropdownMenu, DropdownItem, vDelete, vShow},
	meta: {
		res: {
			props: {
				items: [
					{
						title: "Delete",
						type: "delete",
						description: "delete this?"
					},
					{
						title: "View",
						type: "show"
					}
				]
			},
			data: {

			}
		}
	},
	props: {
		_items: {type: Array, required: true, doc: true}
	},
	data() {
		return {
			actions: this._items,
			item: null
		}
	},
	computed: {
		component() {
			if (get(this.item, "type") === "delete") return "vDelete";
			if (get(this.item, "type") === "show") return "vShow";
		}
	},
	methods: {
		click(item) {
			this.item = item;
		}
	}
};
</script>

<style lang="scss" scoped>
.actions {
	display: inline-block;

	.el-dropdown-link {
		user-select: none;
		font-size: em(14);
		color: $blue5;
	}

	.popover {
		.text {
			word-break: break-word;
			text-align: left;
			margin-bottom: 1em;
			font-size: em(14);
		}
		.buttons {
			display: flex;
			align-items: center;
		}
	}
}
</style>
