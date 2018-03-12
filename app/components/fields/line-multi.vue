<template>
	<div class="line-multi">
		<draggable :list="items" :options="{handle: '.drag'}" @end="listUpdate" v-if="items.length > 0">
			<div class="item" v-for="(item, i) in items" :key="item.id">
				<component :is="_line" v-bind="[itemsPropsData[i], itemsPropsValue[i]]" @fieldA="fieldA($event, i)" />
			</div>
		</draggable>

		<div v-else class="noitems">
			No items
		</div>
	</div>
</template>

<script>
import {mapValues, mapKeys, get} from "lodash";
import draggable from "vuedraggable";
import {vLine, vLineImage} from "./index";

export default {
	components: {draggable, vLine, vLineImage},
	meta: {
		res: {
			props: {
				line: "vLine",
				items: "models",
				itemFieldId: "vLine",
				itemFieldProps: {
					titleKey: "modal",
					titleValue: "titleValue",
					infoKey: "variants",
					infoItems: "infoItems",
					infoItemKey: "name",
					switchTitle: "a switch",
					switchValue: "switchValue",
					selectValue: "selectValue",
					selectOptions: {
						endpoint: "https://sikaline.glitch.me/table-actions/options",
						key: "",
						label: "name",
						value: "id"
					},
					actions: [
						{
							title: "Delete",
							type: "delete",
							description: "delete this?"
						},
						{
							title: "View",
							type: "show",
							endpoint: "doc"
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
							{
								name: "okesf"
							},
							{
								name: "wef"
							}
						]
					},
					{
						titleValue: "modal #2",
						switchValue: false,
						selectValue: "",
						infoItems: [
							{
								name: "okesf"
							},
							{
								name: "wef"
							}
						]
					}
				]
			}
		}
	},
	props: {
		_line: {type: String, required: true, doc: true},
		items: {type: Array, required: true, doc: true},
		_items: {type: String, required: true},
		_itemFieldId: {type: String, required: true, doc: true},
		_itemFieldProps: {type: Object, required: true, doc: true}
	},
	computed: {
		itemsPropsData() {
			return this.items.map(item => {
				return mapValues(this._itemFieldProps, (val) => get(item, val));
			});
		},
		itemsPropsValue() {
			return this.items.map(item => {
				return mapKeys(this._itemFieldProps, (val, key) => `_${key}`);
			});
		}
	},
	methods: {
		fieldA({action, data, done}, i) {
			this[action]({data, done, i});
		},

		update({data, done, i}) {
			data = mapKeys(data, (val, key) => `${this._items}[${i}].${key}`);
			this.$emit("fieldA", {action: "update", data, done});
		},

		show({data, i}) {
			const {id} = this.items[i];
			this.$router.push("/" + data.endpoint.replace("{id}", id));
		},

		remove({done, i}) {
			this.items.splice(i, 1);
			this.listUpdate();
			if (done) done();
		},

		listUpdate() {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._items]: this.items}
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
