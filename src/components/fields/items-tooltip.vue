<template>
	<div class="items-tooltip">
		<Tooltip placement="right" v-bind="{disabled}">
			<slot>
				<div class="info">
					<div class="count">{{items.length}}</div>
					<i class="el-icon-info" v-if="!disabled" />
				</div>
			</slot>

			<div slot="content">
				<div class="items-tooltip-content">
					<template v-if="_itemLink">
						<a v-for="item in itemsMap" class="item" :key="item.link" :href="item.link" @click.prevent="go(item)">
							{{item.label}}
						</a>
					</template>

					<template v-else>
						<div v-for="item in itemsMap" class="item">
							{{item.label}}
						</div>
					</template>
				</div>
			</div>
		</Tooltip>
	</div>
</template>

<script>
import {get} from "lodash";
import {Tooltip} from "element-ui";
import {endpointUrl} from "@/modules/utils";

export default {
	components: {Tooltip},
	meta: {
		res: {
			props: {
				itemKey: "key",
				itemLink: "/view/{id}",
				items: "itemList"
			},
			data: {
				itemList: [
					{key: "item1", id: 1},
					{key: "item2", id: 2}
				]
			}
		}
	},
	props: {
		items: {type: Array, required: true, doc: true},
		_itemLink: {type: String, required: false, doc: true},
		_itemKey: {type: String, required: true, doc: true}
	},
	computed: {
		disabled: (t) => t.items.length < 1,

		itemsMap: (t) => t.items.map(item => ({
			label: get(item, t._itemKey),
			link: endpointUrl({url: t._itemLink, data: item})
		}))
	},
	methods: {
		go({link}) {
			this.$router.push(link);
		}
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
