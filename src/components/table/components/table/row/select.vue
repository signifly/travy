<template>
	<div class="select">
		<Checkbox v-bind="{value}" @input="select" />
	</div>
</template>

<script>
import {Checkbox} from "element-ui";

export default {
	components: {Checkbox},
	props: {
		selected: {type: Object, required: true},
		row: {type: Object, required: true}
	},
	computed: {
		value() {
			return !!this.selected.items.find((x) => x.id === this.row.id);
		}
	},
	methods: {
		select(value) {
			if (value) {
				this.selected.items.push(this.row);
			} else {
				this.selected.items = this.selected.items.filter(
					(x) => x.id !== this.row.id
				);
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
