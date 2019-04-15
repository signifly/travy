<template>
	<div class="bulk">
		<Dropdown
			trigger="click"
			:show-timeout="0"
			:hide-timeout="0"
			:hide-on-click="false"
			@command="select"
		>
			<Button size="medium">
				Bulk actions<i class="el-icon-arrow-up el-icon--right"></i>
			</Button>

			<DropdownMenu slot="dropdown">
				<bulkAction
					v-for="action in actions"
					:active="actAction === action"
					:key="action.title"
					v-bind="{action, ids}"
					@close="close"
					@event="event"
				/>
			</DropdownMenu>
		</Dropdown>
	</div>
</template>

<script>
import {Button, Dropdown, DropdownMenu} from "element-ui";
import bulkAction from "./action";

export default {
	components: {Button, Dropdown, DropdownMenu, bulkAction},
	props: {
		actions: {type: Array, required: true},
		ids: {type: Array, required: true}
	},
	data() {
		return {
			actAction: null
		};
	},
	methods: {
		close() {
			this.actAction = null;
		},
		select(action) {
			this.actAction = this.actAction === action ? null : action;
		},
		event(e) {
			this.close();
			this.$emit("event", e);
		}
	}
};
</script>
