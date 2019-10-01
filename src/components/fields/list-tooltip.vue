<template>
	<div class="list-tooltip">
		<Tooltip placement="right" v-bind="{disabled}">
			<slot>
				<div class="info">
					<div class="count">{{ items.length }}</div>
					<i class="el-icon-info" v-if="!disabled" />
				</div>
			</slot>

			<div slot="content">
				<div class="list-tooltip-content">
					<template v-for="item in items">
						<a
							v-if="item._link"
							class="item"
							:key="item._link"
							:href="item._link"
							@click.prevent="go(item)"
						>
							{{ item.label }}
						</a>

						<div v-else class="item" :key="item.label" v-text="item.label" />
					</template>
				</div>
			</div>
		</Tooltip>
	</div>
</template>

<script>
import {Tooltip} from "element-ui";

export default {
	components: {Tooltip},
	meta: {
		spec: {
			items: {
				type: Object,
				required: true,
				children: {
					"@scope": {type: Array, required: true},
					_link: {type: String, required: false},
					label: {type: String, required: true}
				}
			}
		},
		res: {
			props: {
				items: {
					_link: "/view/{id}",
					"@scope": "items",
					label: "name"
				}
			},
			data: {
				items: [{name: "item1", id: 1}, {name: "item2", id: 2}]
			}
		}
	},
	props: {
		items: {type: Array, required: true}
	},
	computed: {
		disabled: (t) => t.items.length < 1
	},
	methods: {
		go({_link}) {
			this.$router.push(_link);
		}
	}
};
</script>

<style lang="scss" scoped>
.list-tooltip {
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

	&-content {
		max-height: calc(100vh - 4em);
		overflow: auto;

		.item {
			display: block;
			color: $white1;
			text-decoration: none;
			margin: 0.1em 0;
		}

		a {
			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
