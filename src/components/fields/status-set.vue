<template>
	<div class="status-set">
		<div class="rows">
			<div class="row" v-for="(row, i) in rows" :key="i">
				<div class="item" v-for="item in row" :key="item.title">
					<div class="title">{{ item.title }}</div>
					<Tag size="small" :type="item.status">{{ item.text }}</Tag>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {chunk} from "lodash";
import {Tag} from "element-ui";

export default {
	components: {Tag},
	meta: {
		res: {
			props: {
				items: "items",
				title: "tt",
				text: "dd",
				status: "ss"
			},
			data: {
				items: [
					{
						tt: "English",
						dd: "translated",
						ss: "success"
					},
					{
						tt: "Danish",
						dd: "Ready",
						ss: "primary"
					},
					{
						tt: "Chinese",
						dd: "Partial",
						ss: "warning"
					},
					{
						tt: "Khmer",
						dd: "No data",
						ss: "danger"
					}
				]
			}
		}
	},
	props: {
		items: {type: Array, required: true, doc: true},
		_title: {type: String, required: true, doc: true},
		_text: {type: String, required: true, doc: true},
		_status: {type: String, required: true, doc: true}
	},
	computed: {
		rows: (t) => chunk(t.itemsMap, 2),
		itemsMap: (t) =>
			t.items.map((x) => ({
				title: x[t._title],
				text: x[t._text],
				status: x[t._status]
			}))
	}
};
</script>

<style lang="scss" scoped>
.status-set {
	.rows {
		.row {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid $blue2;
			padding: 0 0.5em;

			&:last-child {
				border-bottom: 0;
			}

			.item {
				width: 50%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1em;

				.title {
					font-size: 0.85em;
					color: $blue4;
				}
			}
		}
	}
}
</style>
