<template>
	<tbody class="rows">
		<row
			v-for="item in data"
			:key="item.id"
			v-bind="{data: item, columns, endpoint}"
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
