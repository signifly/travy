<template>
	<draggable :list="items" v-if="items && updated" @end="update">
		<template v-for="field in fieldsSorted">
			<slot v-bind="{field}"></slot>
		</template>
	</draggable>
</template>

<script>
const draggable = () => import(/* webpackChunkName: "vuedraggable" */ "vuedraggable");
import {mapValues, sortBy, get} from "lodash";
import field from "./field.vue";

export default {
	components: {draggable, field},
	props: {
		draggable: {type: String, required: true},
		fields: {type: Array, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			updated: false,
			items: null
		}
	},
	computed: {
		props: (t) => t.fields.map(x => x.fieldType.props),
		propsData: (t) => t.props.map(props => mapValues(props, (key) => get(t.data, key))),

		fieldsSorted() { // order fields by {order} in data
			return sortBy(this.fields, (field) => {
				const data = mapValues(field.fieldType.props, (key) => get(this.data, key));
				return data.order;
			});
		}
	},
	methods: {
		update() {
			const items = this.propsData.map((x, i) => ({...x, order: this.items[i].order}));

			this.$emit("update", {
				data: {[this.draggable]: items}
			});
		}
	},
	created() {
		this.items = [...this.propsData];
	},
	mounted() {
		this.updated = true;
	}
};
</script>

<style lang="scss" scoped>
.drag {

}
</style>
