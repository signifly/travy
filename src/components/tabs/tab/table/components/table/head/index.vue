<template>
	<thead align="left">
		<tr>
			<th width="8" />
			<th v-bind="{width}" v-if="sort && sort.move" />
			<th v-bind="{width}" v-if="expand" />
			<th v-bind="{width}" v-if="selected.active">
				<vselect v-bind="{selected, data}" />
			</th>
			<item
				v-for="(column, i) in columns"
				@getData="$emit('getData')"
				v-bind="column"
				:key="i"
			/>
		</tr>
	</thead>
</template>

<script>
import vselect from "./select";
import item from "./item";

export default {
	components: {vselect, item},
	props: {
		selected: {type: Object, required: true},
		expand: {type: Object, required: false},
		columns: {type: Array, required: true},
		sort: {type: Object, required: false},
		data: {type: Array, required: false}
	},
	data: () => ({
		width: 25
	})
};
</script>

<style lang="scss" scoped>
thead {
	tr {
		th {
			background-color: #f9fafc;
		}
	}
}
</style>
