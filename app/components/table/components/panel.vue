<template>
	<panel>
		<div class="selected">
			<Checkbox v-model="checked" @change="unselect">{{selected.length}} selected</Checkbox>
		</div>

		<div class="actions">
			<template v-for="action in batch.actions">
				<Button size="medium" :type="action.type" :icon="`el-icon-${action.icon}`">{{action.title}}</Button>
			</template>
		</div>
	</panel>
</template>

<script>
import panel from "../../panel.vue";
import {Button, Checkbox} from "element-ui";

export default {
	components: {panel, Button, Checkbox},
	props: {
		selected: {type: Array, required: true},
		batch: {type: Object, required: true}
	},
	data() {
		return {
			checked: true
		}
	},
	methods: {
		unselect() {
			this.$emit("unselect");
		}
	}
};
</script>

<style lang="scss" scoped>
.selected {
	.el-checkbox {
		font-weight: 400;
	}
}
</style>
