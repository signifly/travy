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
		spec: {
			items: {
				type: Object,
				required: true,
				children: {
					"@scope": {type: Array, required: true},
					status: {type: String, required: true},
					title: {type: String, required: true},
					text: {type: String, required: true}
				}
			}
		},
		res: {
			props: {
				items: {
					"@scope": "items",
					status: "status",
					title: "title",
					text: "text"
				}
			},
			data: {
				items: [
					{
						title: "English",
						text: "translated",
						status: "success"
					},
					{
						title: "Danish",
						text: "Ready",
						status: "primary"
					},
					{
						title: "Chinese",
						text: "Partial",
						status: "warning"
					},
					{
						title: "Khmer",
						text: "No data",
						status: "danger"
					}
				]
			}
		}
	},
	props: {
		items: {type: Array, required: true}
	},
	computed: {
		rows: (t) => chunk(t.items, 2)
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
