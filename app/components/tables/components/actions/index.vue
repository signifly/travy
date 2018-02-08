<template>
	<div class="actions">
		<Button
		v-for="(item, i) in items"
		:type="item.status"
		:key="item.title"
		:icon="`el-icon-${item.icon}`"
		size="medium"
		@click="action = item">
			{{item.title}}
		</Button>

		<transition name="el-fade-in">
			<modal v-if="active" :active.sync="active" v-bind="action" :endpoints="endpoints" />
		</transition>
	</div>
</template>

<script>
import {Button} from "element-ui";
import modal from "./modal/index.vue";

export default {
	components: {Button, modal},
	props: {
		actions: {type: Array, required: true},
		endpoints: {type: Object, required: true}
	},
	data() {
		return {
			items: this.actions,
			action: undefined
		}
	},
	computed: {
		active: {
			get() {
				return !!this.action;
			},
			set(bool) {
				if (!bool) this.action = undefined;
			}
		}
	},
	methods: {
		activate(i) {
			this.$set(this.items[i], "active", true);
		}
	}
};
</script>

<style lang="scss" scoped>
.actions {

}
</style>
