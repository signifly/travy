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

		<component v-if="component" :is="component" v-bind="[item, {item, rootData}]" @close="item = null" />
	</div>
</template>

<script>
import {get} from "lodash";
import {Dropdown, DropdownMenu, DropdownItem, Popover, Button} from "element-ui";
import vDelete from "./delete.vue";
import vShow from "./show.vue";
import vModal from "./modal.vue";

export default {
	components: {Dropdown, DropdownMenu, DropdownItem, vDelete, vShow, vModal},
	meta: {
		res: {
			props: {
				items: [
					{
						title: "Delete",
						type: "delete",
						text: "delete this?"
					},
					{
						title: "View",
						type: "show"
					},
					{
						title: "Edit",
						type: "edit"
					}
				]
			},
			data: {

			}
		}
	},
	props: {
		_items: {type: Array, required: true, doc: true},
		rootData: {type: Object, required: false}
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
			if (get(this.item, "type") === "modal") return "vModal";
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
