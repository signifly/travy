<template>
	<div class="progress-set">
		<div class="rows">
			<div class="row" v-for="(row, i) in rows" :key="i">
				<div
					:class="item.status"
					v-for="item in row"
					:key="item.title"
					class="item"
				>
					<div class="title">{{ item.title }}</div>
					<div class="bar" :style="{color: item.color}">
						<Progress
							:percentage="item.percentage"
							:color="item.color"
							class="progressbar"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {chunk} from "lodash";
import {Progress} from "element-ui";

export default {
	components: {Progress},
	meta: {
		spec: {
			items: {
				type: Object,
				required: true,
				children: {
					color: {type: String, required: false, note: "overrides status"},
					percentage: {type: Number, required: true},
					"@scope": {type: Array, required: true},
					status: {type: String, required: false},
					title: {type: String, required: true}
				}
			}
		},
		res: {
			props: {
				items: {
					percentage: "{percentage}",
					status: "{status}",
					"@scope": "items",
					title: "{title}",
					color: "{color}"
				}
			},
			data: {
				items: [
					{
						status: "primary",
						title: "English",
						percentage: 60,
						color: "purple"
					},
					{
						title: "Danish",
						percentage: 10,
						status: "Danger"
					},
					{
						title: "Khmer",
						percentage: 30,
						status: "warning"
					},
					{
						title: "Chinese",
						percentage: 100,
						status: "success"
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
.progress-set {
	.rows {
		.row {
			display: flex;
			justify-content: space-between;
			margin-bottom: 1em;

			&:last-child {
				margin-bottom: 0;
			}

			.item {
				width: calc(50% - 0.8em);

				.title {
					font-size: 0.85em;
					color: $blue4;
				}

				.bar {
					.progressbar {
						::v-deep .el-progress__text {
							font-size: 0.8em !important;
							margin-left: 1.25em;
						}
					}
				}
			}
		}
	}
}

.bar {
	::v-deep {
		.el-progress-bar__inner {
			.danger & {
				background-color: $danger;
			}
			.warning & {
				background-color: $warning;
			}
			.info & {
				background-color: $info;
			}
			.primary & {
				background-color: $primary;
			}
			.success & {
				background-color: $success;
			}
		}
	}
}
</style>
