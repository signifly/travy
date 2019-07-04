<template>
	<div class="expand">
		<Table border size="mini" v-bind="{data}">
			<TableColumn label="key" prop="key" width="250" v-slot="{row}">
				<b class="key" v-text="row.key" />
			</TableColumn>
			<TableColumn label="from" prop="from" v-if="old" />
			<TableColumn :label="old ? 'to' : 'data'" prop="to" />
		</Table>
	</div>
</template>

<script>
import {get} from "lodash";
import {Table, TableColumn} from "element-ui";

export default {
	components: {Table, TableColumn},
	props: {
		attributes: {type: Object, required: true},
		old: {type: Object, required: false}
	},
	computed: {
		data: (t) =>
			Object.entries(t.attributes).map(([key, val]) => ({
				key,
				to: val,
				from: get(t.old, key)
			}))
	}
};
</script>
