<template>
	<component :is="link ? 'router-link' : 'div'" class="table-field" :to="link">
		<field
			:data="data"
			:field="column"
			:hide="['label']"
			@event="$emit('event', $event)"
		/>
	</component>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import field from "@/components/field";

export default {
	components: {field},
	props: {
		column: {type: Object, required: true},
		data: {type: Object, required: true},
		state: {type: Object, request: true}
	},
	computed: {
		onClick: (t) => t.column.onClick,
		query: (t) => t.state.query,
		link() {
			const url = rStringProps({data: this.data, val: this.onClick});
			return url
				? {path: url, query: {modifiers: this.query.modifiers}}
				: false;
		}
	}
};
</script>

<style lang="scss" scoped>
.table-field {
	text-decoration: none;
	padding: 1em 10px;
	display: block;
	color: $black1;
	width: 100%;

	.field {
		margin: 0;
	}
}
</style>
