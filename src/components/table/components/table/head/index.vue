<template>
	<thead class="head" align="left">
		<tr>
			<th width="30" v-if="selected.active">
				<vselect v-bind="{selected, data}" />
			</th>
			<item
				@getData="$emit('getData')"
				v-for="column in columns"
				:key="column.name"
				v-bind="column"
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
		columns: {type: Array, required: true},
		data: {type: Array, required: false}
	}
};
</script>

<style lang="scss" scoped>
.head {
	tr {
		th {
			background-color: #f9fafc;
		}
	}
}
</style>
