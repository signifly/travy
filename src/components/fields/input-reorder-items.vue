<template>
	<div class="reorder-items">
		<draggable
			class="draggable"
			:value="items.data"
			handle=".drag"
			@input="update"
			v-if="items.data.length > 0"
		>
			<div class="item" v-for="item in itemsC" :key="item.data.id">
				<div class="icon drag">
					<i class="el-icon-rank"></i>
				</div>

				<div class="image" :style="{backgroundImage: `url('${item.image}')`}" />

				<div class="list">
					<div class="item" v-for="{label, value} in item.list" :key="label">
						<div class="label">{{ label }}:</div>
						<div class="value" v-text="value" />
					</div>
				</div>

				<actions
					v-bind="{_actions: item.actions, alt}"
					@event="$emit('event', $event)"
				/>
			</div>
		</draggable>
	</div>
</template>

<script>
import actions from "./button-actions.vue";
import draggable from "vuedraggable";
import {meta} from "@/modules/utils";
import {get} from "lodash";

export default {
	components: {draggable, actions},
	meta: {
		res: {
			props: {
				items: {
					data: "items",
					image: "image",
					list: [
						{label: "variant", value: "variant"},
						{label: "model", value: "model"}
					],
					actions: []
				},
				endpoint: {
					url: meta.items,
					method: "put"
				}
			},
			data: {
				items: [
					{
						id: 1,
						model: 1,
						variant: 1,
						image: "https://picsum.photos/200/300?grayscale"
					},
					{
						id: 2,
						model: 2,
						variant: 2,
						image: "https://picsum.photos/200/300?grayscale"
					},
					{
						id: 3,
						model: 3,
						variant: 3,
						image: "https://picsum.photos/200/300?grayscale"
					}
				]
			}
		}
	},
	props: {
		_endpoint: {type: Object, required: true, doc: true},
		items: {type: Object, required: true, doc: true},
		_items: {type: Object, required: true},
		alt: {type: Object, required: true}
	},
	computed: {
		itemsC() {
			return this.items.data.map((item) => ({
				data: item,

				image: get(item, this._items.image),

				list: this._items.list.map((x) => ({
					label: x.label,
					value: get(item, x.value)
				})),

				actions: this._items.actions
			}));
		}
	},
	methods: {
		update(items) {
			this.$emit("event", {
				actions: {
					update: {data: {[this._items.data]: items}}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.reorder-items {
	.draggable {
		> .item {
			background-color: $white2;
			border: 1px solid $blue3;
			border-radius: 4px;
			padding: 0 2em;
			display: flex;
			align-items: center;
			margin: 0.25em 0;
			height: em(100);

			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1.25em;
				color: $blue4;
				cursor: grab;
				padding: 1em;
				margin-left: -1em;
				margin-right: 0.5em;
			}

			.image {
				width: 4em;
				height: 4em;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
				margin-right: 2em;
			}

			.list {
				margin-right: 1em;
				font-size: em(13);
				color: $blue4;

				.item {
					display: flex;
					margin: 0.6em 0;

					.label {
						font-weight: 600;
						margin-right: 0.5em;
					}
				}
			}

			.actions {
				margin-left: auto;

				a {
					text-decoration: none;
					color: $blue5;
				}
			}
		}
	}
}
</style>
