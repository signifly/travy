<template>
	<draggable :list="items" v-if="items" @end="listUpdate">
		<field
			v-for="(data, index) in items"
			v-bind="{data, field, draggable}"
			@update="update({$event, index})"
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
		update({$event, index}) {
			const data = mapKeys($event.data, (val, key) => `${this.draggable}[${index}].${key}`);
			this.$emit("update", {data});
		}
	}
};
</script>

<style lang="scss" scoped>
.drag {

}
</style>
