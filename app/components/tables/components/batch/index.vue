<template>
	<div class="batch">
		<vPanel>
			<div class="selected">
				<Checkbox v-model="checked" @change="unselect">{{selected.length}} selected</Checkbox>
			</div>

			<div class="actions">
				<Button v-if="sequential" size="medium" @click="sequentialStart">Sequential edit</Button>

				<Dropdown v-if="bulk" trigger="click" :show-timeout="0" :hide-timeout="0" @command="select">
					<Button size="medium">
						Bulk actions<i class="el-icon-arrow-up el-icon--right"></i>
					</Button>

					<DropdownMenu slot="dropdown">
						<DropdownItem v-for="action in actions" :key="action.title" :command="action">{{action.title}}</DropdownItem>
					</DropdownMenu>

					<vAction v-if="action && action.props.id !== 'modal'" v-bind="[action, {ids}]" @close="close" />
				</Dropdown>
			</div>
		</vPanel>

		<vAction v-if="action && action.props.id === 'modal'" v-bind="[action, {ids}]" @close="close" />
	</div>
</template>

<script>
import {get, sortBy} from "lodash";
import {Button, Checkbox, Dropdown, DropdownMenu, DropdownItem} from "element-ui";
import {endpointUrl} from "@/modules/utils";
import vPanel from "@/components/panel.vue";
import vAction from "./action.vue";

export default {
	components: {Dropdown, DropdownMenu, DropdownItem, vPanel, Button, Checkbox, vAction},
	props: {
		endpoints: {type: Object, required: true},
		selected: {type: Array, required: true},
		batch: {type: Object, required: true}
	},
	data() {
		return {
			error: {},
			checked: true,
			action: null,
			popover: false,
			modal: false
		}
	},
	computed: {
		ids: (t) => sortBy(t.selected.map(x => x.id)),
		sequential: (t) => t.batch.sequential,
		actions: (t) => t.batch.actions,
		bulk: (t) => t.batch.bulk,
	},
	methods: {
		unselect() {
			this.$emit("unselect");
		},

		close() {
			this.action = null;
		},

		select(action) {
			this.action = action;
		},

		sequentialStart() {
			const modifiers = this.$route.query.modifiers;
			const url = this.endpoints.show.url.replace("{id}", this.ids[0]);

			this.$router.push({path: url, query: {modifiers, seq: {items: this.ids}}});
		}
	}
};
</script>

<style lang="scss" scoped>
.batch {
	position: relative;
	.selected {
		.el-checkbox {
			font-weight: 400;
		}
	}
}
</style>
