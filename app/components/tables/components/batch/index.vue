<template>
	<div class="batch">
		<vPanel>
			<div class="selected">
				<Checkbox v-model="checked" @change="unselect">{{selected.length}} selected</Checkbox>
			</div>

			<div class="actions">
				<Button size="medium" @click="seq">Sequential edit</Button>

				<Dropdown trigger="click" :show-timeout="0" :hide-timeout="0" @command="open">
					<Button size="medium">
						Bulk actions<i class="el-icon-arrow-up el-icon--right"></i>
					</Button>

					<DropdownMenu slot="dropdown">
						<DropdownItem v-for="action in actions" :key="action.title" :command="action">{{action.title}}</DropdownItem>
					</DropdownMenu>

					<vPopover :popover.sync="popover" v-bind="{action, endpoints}" @save="save($event, {custom: false})"/>
				</Dropdown>
			</div>
		</vPanel>

		<vModal v-if="modal" :active.sync="modal" v-bind="action" :endpoints="endpoints" :error="error" @save="save($event, {custom: true})"/>
	</div>
</template>

<script>
import {get, sortBy} from "lodash";
import {Button, Checkbox, Dropdown, DropdownMenu, DropdownItem} from "element-ui";
import vPanel from "@/components/panel.vue";
import vModal from "./modal.vue";
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
			error: {},
			checked: true,
			action: null,
			popover: false,
			modal: false
		}
	},
	computed: {
		endpoint: (t) => get(t.action, "endpoint", t.endpoints.bulkUpdate),
		first: (t) => t.endpoints.show.url.replace("{id}", t.ids[0]),
		ids: (t) => sortBy(t.selected.map(x => x.id)),
		actions: (t) => t.batch.actions,
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

		async save({data, done}, {custom}) {
			const ept = this.endpoint;

			try {
				await this.$http[ept.method](ept.url, {data, ids: this.ids}, {custom});
				await done();
			} catch({response}) {
				if (custom) this.error = response.data;
				await done({error: true});
			}
		},

		seq() {
			this.$router.push({path: this.first, query: {seq: {items: this.ids}}});
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
