<template>
	<div class="line-multi">
		<draggable :list="items" :options="{handle: '.drag'}" @end="listUpdate" v-if="items.length > 0">
			<div class="item" v-for="(item, i) in items" :key="item.id">
				<component
					:is="_itemFieldId"
					v-bind="[itemsPropsData[i], itemsPropsValue[i]]"
					:alt="{data: itemsData[i]}"
					@event="event($event, i)"
				/>
			</div>
		</draggable>

		<div v-else class="noitems">
			No items
		</div>
	</div>
</template>

<script>
import {meta} from "@/modules/utils";
import draggable from "vuedraggable";
import {mapValues, mapKeys, get} from "lodash";
import vLine from "./line.vue";
import vLineImage from "./line-image.vue";
import vLineImageItems from "./line-image-items.vue";

export default {
	components: {draggable, vLine, vLineImage, vLineImageItems},
	meta: {
		res: {
			props: {
				items: "models",
				itemFieldId: "vLine",
				itemFieldProps: {
					titleKey: "modal",
					titleValue: "titleValue",
					infoKey: "variants",
					infoItems: "infoItems",
					infoItemKey: "name",
					infoItemLink: "/view/{id}",
					switchTitle: "a switch",
					switchValue: "switchValue",
					selectValue: "selectValue",
					selectClearable: false,
					selectOptions: {
						endpoint: meta.items,
						key: "",
						label: "name",
						value: "id"
					},
					actions: [
						{
							title: "Delete",
							props: {
								id: "remove",
								text: "delete this?",
								endpoint: {
									url: "url",
									method: "delete"
								}
							}
						}
					]
				}
			},
			data: {
				models: [
					{
						titleValue: "modal #1",
						switchValue: false,
						selectValue: "",
						infoItems: [
							{name: "okesf", id: 1},
							{name: "wef", id: 2}
						]
					},
					{
						titleValue: "modal #2",
						switchValue: false,
						selectValue: "",
						infoItems: [
							{name: "okesf", id: 1},
							{name: "wef", id: 2}
						]
					}
				]
			}
		}
	},
	props: {
		items: {type: Array, required: true, doc: true},
		_items: {type: String, required: true},
		_itemFieldId: {type: String, required: true, doc: true},
		_itemFieldProps: {type: Object, required: true, doc: true}
	},
	computed: {
		itemsData() {
			return this.items;
		},
		itemsPropsData() {
			return this.items.map(item => {
				return mapValues(this._itemFieldProps, (val) => get(item, val));
			});
		},
		itemsPropsValue() {
			return this.items.map(() => {
				return mapKeys(this._itemFieldProps, (val, key) => `_${key}`);
			});
		}
	},
	methods: {

		event({actions, done}, i) {
			if (actions.update) {
				let {data} = actions.update;
				data = mapKeys(data, (val, key) => `${this._items}[${i}].${key}`);

				this.$emit("event", {
					done,
					actions: {
						update: {data}
					}
				});
			}

			if (actions.refresh) {
				this.$emit("event", {actions});
			}
		},

		remove({done, i}) {
			this.items.splice(i, 1);
			this.listUpdate();
			if (done) done();
		},

		listUpdate() {
			this.$emit("event", {
				actions: {
					update: {data: {[this._items]: this.items}}
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.line-multi {
	.item {
		margin: 0.5em 0;
	}
	.noitems {
		color: $blue4;
		font-size: em(12);
		margin: 1em 0;
	}
}
</style>
