<template>
	<tbody class="rows">
		<row
			v-for="row in data"
			:key="row.id"
			v-bind="{row, columns, endpoint}"
			@event="$emit('event', $event)"
		/>
	</tbody>
</template>

<script>
import row from "./row";

export default {
	components: {row},
	props: {
		modifiers: {type: Object, required: false},
		endpoint: {type: Object, required: false},
		columns: {type: Array, required: true},
		data: {type: Array, required: true}
	}
};
</script>

<style lang="scss" scoped></style>
