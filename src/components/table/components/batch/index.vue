<template>
	<div class="batch">
		<vPanel>
			<vSelected v-bind="{selectedItems, selectedOptions}" @unselect="unselect"/>

			<div class="actions">
				<Button v-if="sequential" size="medium" @click="sequentialStart">Sequential edit</Button>

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
import {get, sortBy} from "lodash";
import {Button, Dropdown, DropdownMenu} from "element-ui";
import {endpointParams} from "@/modules/utils";
import vPanel from "@/components/panel.vue";
import vSelected from "./selected.vue";
import batchAction from "./action.vue";

export default {
	components: {Dropdown, DropdownMenu, vPanel, Button, vSelected, batchAction},
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
		seqParam: (t) => t.sequential ? endpointParams({url: t.sequential.url})[0] : [],

		ids: (t) => sortBy(t.selectedItems.map(x => x[t.seqParam])),

		sequentialUrl: (t) => get(t.sequential, "url", "").replace(`{${t.seqParam}}`, t.ids[0])
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
		},

		sequentialStart() {
			const modifiers = this.$route.query.modifiers;
			this.$router.push({path: this.sequentialUrl, query: {modifiers, seq: {items: this.ids}}});
		}
	}
};
</script>

<style lang="scss" scoped>
.batch {
	position: relative;
}
</style>
