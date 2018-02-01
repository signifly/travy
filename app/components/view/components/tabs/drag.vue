<template>
	<draggable :list="items" v-if="items" @end="listUpdate">
		<field
			v-for="(data, index) in items"
			v-bind="{data, field, draggable}"
			@fieldA="fieldA($event, index)"
			:key="data.id"
		/>
	</draggable>
</template>

<script>
import draggable from "vuedraggable";
import {mapKeys} from "lodash";
import field from "./field.vue";

export default {
	components: {draggable, field},
	props: {
		draggable: {type: String, required: true},
		field: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			items: [...this.data[this.draggable]]
		}
	},
	methods: {
		listUpdate() {
			this.$emit("update", {
				data: {[this.draggable]: this.items}
			});
		},

		fieldA({action, data, done}, index) {
			this[action]({data, done, index});
		},

		show() {

		},

		update({data, index, done}) {
			data = mapKeys(data, (val, key) => `${this.draggable}[${index}].${key}`);
			this.$emit("fieldA", {action: "update", data, done});
		},

		remove({index, done}) {
			this.items.splice(index, 1);
			this.listUpdate();
			if (done) done();
		}
	}
};
</script>

<style lang="scss" scoped>
.drag {

}
</style>
