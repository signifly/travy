<template>
	<div class="action">
		<component
			:is="props.id"
			v-bind="[props, {data}]"
			position="top-right"
			@close="close"
			@submit="submit"
		/>
	</div>
</template>

<script>
import * as actions from "@/components/actions";

export default {
	components: {...actions},
	props: {
		props: {type: Object, required: true},
		ids: {type: Array, required: true}
	},
	computed: {
		data() {
			return {...this.props.data, ids: this.ids};
		}
	},
	methods: {
		close() {
			this.$emit("close");
		},
		submit() {
			this.close();
			this.$parent.$emit("submit");
		}
	}
};
</script>

<style lang="scss" scoped>
.action {

}
</style>
