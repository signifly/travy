<template>
	<div class="actions">
		<action v-for="action in actions" :key="action.title" v-bind="action">
			<tableAction v-bind="action" @fieldA="fieldA"/>
		</action>
	</div>
</template>

<script>
import tableAction from "./action.vue";
import {action} from "@/components/actions";

export default {
	components: {tableAction, action},
	props: {
		actions: {type: Array, required: true}
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.actions {
	display: flex;
}
</style>
