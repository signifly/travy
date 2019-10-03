<template>
	<div class="select">
		<Checkbox v-bind="{indeterminate, value: all}" @input="select" />
	</div>
</template>

<script>
import {Checkbox} from "element-ui";
import {uniqBy} from "lodash";

export default {
	components: {Checkbox},
	props: {
		selected: {type: Object, required: true},
		data: {type: Array, required: false}
	},
	computed: {
		items() {
			return this.selected.items;
		},
		all() {
			return this.data.every((x) => this.items.find((i) => i.id === x.id));
		},
		indeterminate() {
			return this.all ? false : this.items.length > 0;
		}
	},
	methods: {
		select(value) {
			if (value) {
				this.selected.items = uniqBy([...this.data, ...this.items], "id");
			} else {
				this.selected.items = [];
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.select {
	justify-content: center;
	display: flex;
}
</style>
