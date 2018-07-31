<template>
	<div class="action">
		<component
			:is="props.id"
			v-bind="[props, {data}]"
			:alt="{}"
			position="top-right"
			@close="close"
			@fieldA="fieldA"
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
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.action {

}
</style>
