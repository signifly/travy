<template>
	<div class="expand">
		<Table border size="mini" v-bind="{data}">
			<TableColumn label="key" prop="key" width="250">
				<b class="key" slot-scope="{row}" v-text="row.key"/>
			</TableColumn>
			<TableColumn :label="old ? 'from' : 'data'" prop="from"/>
			<TableColumn label="to" prop="to" v-if="old"/>
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
		data: (t) => Object.entries(t.attributes).map(([key, val]) => ({
			key,
			from: val,
			to: get(t.old, key)
		}))
	}
};
</script>
