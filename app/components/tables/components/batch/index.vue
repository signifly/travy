<template>
	<div class="batch">
		<vPanel>
			<div class="selected">
				<Checkbox v-model="checked" @change="unselect">{{selected.length}} selected</Checkbox>
			</div>

			<div class="actions">
				<Button size="medium">Sequential edit</Button>

				<Dropdown trigger="click" :show-timeout="0" :hide-timeout="0" @command="open">
					<Button size="medium">
						Bulk actions<i class="el-icon-arrow-up el-icon--right"></i>
					</Button>

					<DropdownMenu slot="dropdown">
						<DropdownItem v-for="action in actions" :key="action.title" :command="action">{{action.title}}</DropdownItem>
					</DropdownMenu>

					<vPopover :popover.sync="popover" v-bind="{action, endpoints}" @save="save"/>
				</Dropdown>
			</div>
		</vPanel>

		<vModal v-if="modal" :active.sync="modal" v-bind="action" :endpoints="endpoints" @save="save"/>
	</div>
</template>

<script>
import {get} from "lodash";
import {Button, Checkbox, Dropdown, DropdownMenu, DropdownItem} from "element-ui";
import vPanel from "@/components/panel.vue";
import vModal from "./modal/index.vue";
import vPopover from "./popover.vue";

export default {
	components: {vPanel, vModal, vPopover, Button, Checkbox, Dropdown, DropdownMenu, DropdownItem},
	props: {
		endpoints: {type: Object, required: true},
		selected: {type: Array, required: true},
		batch: {type: Object, required: true}
	},
	data() {
		return {
			checked: true,
			action: null,

			popover: false,
			modal: false
		}
	},
	computed: {
		actions: (t) => t.batch.actions,
		ids: (t) => t.selected.map(x => x.id)
	},
	methods: {
		unselect() {
			this.$emit("unselect");
		},

		open(action) {
			this.action = action;
			this.popover = action.type === "popover";
			this.modal = action.type === "modal";
		},

		async save({data, done}) {
			try {
				const res = await this.$http.put(this.endpoints.bulkUpdate.url, {data, ids: this.ids});
			} catch(err) {} finally {
				if (done) done();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.batch {
	.selected {
		.el-checkbox {
			font-weight: 400;
		}
	}
}
</style>
