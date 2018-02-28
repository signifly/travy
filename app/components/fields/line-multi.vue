<template>
	<div class="line-multi">
		<div class="items">
			<vLine v-for="(item, i) in items" :key="i" v-bind="[itemsPropsData[i], itemsPropsValue[i]]" @fieldA="fieldA($event, i)" />
		</div>
	</div>
</template>

<script>
import {mapValues, mapKeys, get} from "lodash";
import draggable from "vuedraggable";
import {vLine} from "./index";

export default {
	components: {draggable, vLine},
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
					switchTitle: "a switch",
					switchValue: "switchValue",
					actions: [
						{
							title: "Delete",
							type: "delete",
							description: "delete this?"
						},
						{
							title: "View",
							type: "show",
							endpoint: "stock-item-models/{id}"
						}
					]
				}
			},
			data: {
				models: [
					{
						titleValue: "modal #1",
						switchValue: false,
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
		items: {type: Array, required: true, doc: true},
		_items: {type: String, required: true},
		_itemFieldId: {type: String, required: true, doc: true},
		_itemFieldProps: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			data: {
				items: this.items
			}
		}
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

}
</style>
