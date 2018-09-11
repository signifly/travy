<template>
	<div class="batch">
		<vPanel>
			<vSelected v-bind="{selectedItems, selectedOptions}" @unselect="unselect"/>

			<div class="actions">
				<sequential v-if="sequential" v-bind="[sequential, {selectedItems, ids}]"/>

				<Dropdown v-if="bulk" trigger="click" :show-timeout="0" :hide-timeout="0" :hide-on-click="false" @command="select">
					<Button size="medium">
						Bulk actions<i class="el-icon-arrow-up el-icon--right"></i>
					</Button>

					<DropdownMenu slot="dropdown">
						<batchAction
							v-for="action in actions"
							:active="selectedAction === action"
							:key="action.title"
							v-bind="{action, ids}"
							@close="close"
							@fieldA="fieldA"
						/>
					</DropdownMenu>
				</Dropdown>
			</div>
		</vPanel>
	</div>
</template>

<script>
import {get} from "lodash";
import {Button, Dropdown, DropdownMenu} from "element-ui";
import vPanel from "@/components/panel.vue";
import vSelected from "./selected.vue";
import batchAction from "./action.vue";
import sequential from "./sequential.vue";

export default {
	components: {Dropdown, DropdownMenu, vPanel, Button, vSelected, batchAction, sequential},
	props: {
		selectedItems: {type: Array, required: true},
		selectedOptions: {type: Object, required: true},
		sequential: {type: Object, required: false},
		actions: {type: Array, required: true},
		bulk: {type: Boolean, required: false},
	},
	data() {
		return {
			selectedAction: null,
			checked: true,
			popover: false,
			modal: false
		}
	},
	computed: {
		tableId: (t) => t.$route.params.tableId,
		ids: (t) => t.selectedItems.map(x => x.id)
	},
	methods: {
		unselect() {
			this.$emit("unselect");
		},

		close() {
			this.selectedAction = null;
		},

		fieldA(obj) {
			this.close();
			this.unselect();
			this.$emit("fieldA", obj);
		},

		select(action) {
			this.selectedAction = action;
		}
	}
};
</script>

<style lang="scss" scoped>
.batch {
	position: relative;
}
</style>
