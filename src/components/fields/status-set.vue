<template>
	<div class="status-set">
		<div class="rows">
			<div class="row" v-for="(row, i) in rows" :key="i">
				<div
					:class="{color: item.color}"
					v-for="item in row"
					:key="item.title"
					class="item"
				>
					<div class="title">{{ item.title }}</div>
					<Tag size="small" :type="item.status" :color="item.color">
						{{ item.text }}
					</Tag>
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
					color: {type: String, required: false, note: "overrides status"},
					"@scope": {type: Array, required: true},
					status: {type: String, required: false},
					title: {type: String, required: true},
					text: {type: String, required: true}
				}
			}
		},
		res: {
			props: {
				items: {
					status: "{status}",
					"@scope": "items",
					color: "{color}",
					title: "{title}",
					text: "{text}"
				}
			},
			data: {
				items: [
					{
						text: "translated",
						status: "success",
						title: "English"
					},
					{
						status: "primary",
						title: "Danish",
						text: "Ready"
					},
					{
						status: "warning",
						title: "Chinese",
						text: "Partial"
					},
					{
						text: "No data",
						title: "Khmer",
						color: "#e6e6ff"
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

				&.color .el-tag {
					border-color: #dedede;
					color: transparentize(black, 0.6);
				}

				.title {
					font-size: 0.85em;
					color: $blue4;
				}
			}
		}
	}
}
</style>
