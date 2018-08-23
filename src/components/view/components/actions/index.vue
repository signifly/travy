<template>
	<div class="actions">
		<action v-for="action in actions" :key="action.title" v-bind="[action, {alt: {data}}]">
			<viewAction v-bind="[action, {alt: {data}}]" @fieldA="fieldA"/>
		</action>
	</div>
</template>

<script>
import viewAction from "./action.vue";
import {action} from "@/components/actions";

export default {
	components: {viewAction, action},
	props: {
		actions: {type: Array, required: true},
		data: {type: Object, required: true}
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

}
</style>
