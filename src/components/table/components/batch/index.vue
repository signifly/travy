<template>
	<div class="batch">
		<vPanel>
			<vSelected v-bind="{selectedItems, selectedOptions}" @unselect="unselect"/>

			<div class="actions">
				<Button v-if="sequential" size="medium" @click="sequentialStart">Sequential edit</Button>

				<Dropdown v-if="bulk" trigger="click" :show-timeout="0" :hide-timeout="0" @command="select">
					<Button size="medium">
						Bulk actions<i class="el-icon-arrow-up el-icon--right"></i>
					</Button>

					<DropdownMenu slot="dropdown">
						<DropdownItem v-for="action in actions" :key="action.title" :command="action">{{action.title}}</DropdownItem>
					</DropdownMenu>

					<vAction v-if="action && action.props.id !== 'modal'" v-bind="[action, {ids}]" @close="close" @fieldA="fieldA" />
				</Dropdown>
			</div>
		</vPanel>

		<vAction v-if="action && action.props.id === 'modal'" v-bind="[action, {ids}]" @close="close" @fieldA="fieldA" />
	</div>
</template>

<script>
import {get, sortBy} from "lodash";
import {Button, Dropdown, DropdownMenu, DropdownItem} from "element-ui";
import {endpointUrl, endpointParams} from "@/modules/utils";
import vPanel from "@/components/panel.vue";
import vSelected from "./selected.vue";
import vAction from "./action.vue";

export default {
	components: {Dropdown, DropdownMenu, DropdownItem, vPanel, Button, vSelected, vAction},
	props: {
		selectedItems: {type: Array, required: true},
		selectedOptions: {type: Object, required: true},
		sequential: {type: Object, required: false},
		actions: {type: Array, required: true},
		bulk: {type: Boolean, required: false},
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
		seqParam: (t) => t.sequential ? endpointParams({url: t.sequential.url})[0] : [],

		ids: (t) => sortBy(t.selectedItems.map(x => x[t.seqParam])),

		sequentialUrl: (t) => get(t.sequential, "url", "").replace(`{${t.seqParam}}`, t.ids[0])
	},
	methods: {
		unselect() {
			this.$emit("unselect");
		},

		close() {
			this.action = null;
		},

		fieldA(obj) {
			this.close();
			this.unselect();
			this.$emit("fieldA", obj);
		},

		select(action) {
			this.action = action;
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
