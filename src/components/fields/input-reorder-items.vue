<template>
	<div class="reorder-items">
		<draggable
			class="draggable"
			v-model="data"
			handle=".drag"
			@input="update"
			v-if="data.length > 0"
		>
			<div class="item" v-for="item in data" :key="item.id">
				<div class="icon drag">
					<i class="el-icon-rank"></i>
				</div>

				<div class="image" :style="{backgroundImage: `url('${item.image}')`}" />

				<div class="list">
					<div class="item" v-for="{_label, value} in item.list" :key="_label">
						<div class="label">{{ _label }}:</div>
						<div class="value" v-text="value" />
					</div>
				</div>

				<actions
					v-if="item.actions"
					v-bind="{_actions: item.actions, alt: {data: item.data}}"
					@event="$emit('event', $event)"
				/>
			</div>
		</draggable>

		<div class="noitems" v-else>
			No data
		</div>
	</div>
</template>

<script>
import actions from "./button-actions.vue";
import draggable from "vuedraggable";

export default {
	components: {draggable, actions},
	meta: {
		spec: {
			_endpoint: {
				type: Object,
				required: true,
				children: {
					payload: {type: Object, required: false},
					method: {type: String, required: true},
					url: {type: String, required: true}
				}
			},
			items: {
				type: Array,
				required: true,
				children: {
					"@scope": {type: Array, required: true},
					image: {type: String, required: true},
					id: {type: [String, Number], required: true},
					list: {
						type: Array,
						required: true,
						children: {
							_label: {type: String, required: true},
							value: {type: [String, Number], required: false}
						}
					}
				}
			}
		},
		res: {
			props: {
				items: {
					"@scope": "items",
					image: "image",
					id: "id",
					list: [
						{_label: "variant", value: "variant"},
						{_label: "model", value: "model"}
					]
				},
				_endpoint: {
					url: "items",
					method: "put",
					payload: {
						type: "type"
					}
				}
			},
			data: {
				items: [
					{
						id: 1,
						model: "model1",
						variant: "variant1",
						image: "https://picsum.photos/200/300"
					},
					{
						id: 2,
						model: "model2",
						variant: "variant2",
						image: "https://picsum.photos/200/300"
					},
					{
						id: 3,
						model: "model3",
						variant: "variant3",
						image: "https://picsum.photos/200/300"
					}
				]
			}
		}
	},
	props: {
		_endpoint: {type: Object, required: true},
		items: {type: Array, required: true}
	},
	data: () => ({
		data: []
	}),
	methods: {
		async update(items) {
			const {method, url, payload} = this._endpoint;

			await this.$axios({
				url,
				method,
				data: {
					...payload,
					data: {items}
				}
			});
		}
	},

	created() {
		this.$watch("items", (items) => (this.data = items || []), {
			immediate: true
		});
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
			margin: 0.5em 0;
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
			}
		}
	}

	.noitems {
		font-weight: 500;
		font-size: 14px;
		margin: 1em;
	}
}
</style>
