<template>
	<fieldTooltip v-bind="{tooltip, data}">
		<component
			:is="link ? 'router-link' : 'div'"
			class="table-field"
			:to="link"
		>
			<field
				:field="{...column, width: undefined}"
				@event="$emit('event', $event)"
				:hide="['label']"
				:data="data"
			/>
		</component>
	</fieldTooltip>
</template>

<script>
import {transProps} from "@/modules/utils";
import field from "@/components/field";
import fieldTooltip from "./tooltip";

export default {
	components: {field, fieldTooltip},
	props: {
		column: {type: Object, required: true},
		data: {type: Object, required: true},
		state: {type: Object, request: true}
	},
	computed: {
		tooltip: (t) => t.column.tooltip,
		onClick: (t) => t.column.onClick,
		query: (t) => t.state.query,
		link() {
			const url = transProps({data: this.data, val: this.onClick});
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
