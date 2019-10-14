<template>
	<component :is="link ? 'router-link' : 'div'" class="table-field" :to="link">
		<field
			:field="column"
			:data="data"
			type="table"
			@event="$emit('event', $event)"
		/>
	</component>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import field from "@/components/field";
import state from "../../../state";

export default {
	components: {field},
	props: {
		data: {type: Object, required: true},
		column: {type: Object, required: true}
	},
	computed: {
		query: () => state.query,
		onClick: (t) => t.column.onClick,
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
