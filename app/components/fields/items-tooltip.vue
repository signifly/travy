<template>
	<div class="items-tooltip">
		<Tooltip placement="right" v-bind="{disabled}">
			<div class="info">
				<div class="count">{{items.length}}</div>
				<i class="el-icon-info" v-if="!disabled" />
			</div>
			<div slot="content" v-html="tooltip" />
		</Tooltip>
	</div>
</template>

<script>
import {get} from "lodash";
import {Tooltip} from "element-ui";

export default {
	components: {Tooltip},
	meta: {
		res: {
			props: {
				itemKey: "key",
				items: "itemList"
			},
			data: {
				itemList: [
					{key: "item1"},
					{key: "item2"}
				]
			}
		}
	},
	props: {
		items: {type: Array, required: true, doc: true},
		_itemKey: {type: String, required: true, doc: true}
	},
	computed: {
		tooltip: (t) => t.items.map(x => get(x, t._itemKey)).join("<br>"),
		disabled: (t) => t.items.length < 1
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
			margin-right: 0.4em;
		}

		i {
			font-size: 0.85em;
		}
	}
}
</style>
