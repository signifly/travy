<template>
	<div class="items-tooltip">
		<Tooltip placement="right">
			<div class="info">
				<div class="count">{{items.length}}</div>
				<i class="el-icon-info" />
			</div>
			<div slot="content" v-html="tooltip" />
		</Tooltip>
	</div>
</template>

<script>
import {Tooltip} from "element-ui";

export default {
	components: {Tooltip},
	props: {
		items: {type: Array, required: true},

		props: {type: Object, required: true, validator(props) {
			const valid = typeof props.itemKey === "string";
			if (!valid) {
				console.warn("props.itemKey is not a string");
				return false;
			} else {
				return true;
			}
		}}
	},
	computed: {
		tooltip: (t) => t.items.map(x => x[t.itemKey]).join("<br>"),
		itemKey: (t) => t.props.itemKey
	}
};
</script>

<style lang="scss" scoped>
.items-tooltip {
	.info {
		display: inline-flex;
		align-items: center;
		color: $blue1;

		.count {
			font-size: 0.9em;
			font-weight: 500;
			margin-right: 0.5em;
		}
	}
}
</style>
