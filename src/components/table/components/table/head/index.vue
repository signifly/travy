<template>
	<thead class="head" align="left">
		<tr>
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
import item from "./item";

export default {
	components: {item},
	props: {
		columns: {type: Array, required: true}
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
