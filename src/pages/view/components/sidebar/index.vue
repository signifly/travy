<template>
	<div class="sidebar">
		<div class="sections">
			<group
				v-for="group in sidebar"
				:key="group.id"
				v-bind="[group, {data}]"
				@fieldA="fieldA"
			/>
		</div>
	</div>
</template>

<script>
import group from "./group";

export default {
	components: {group},
	props: {
		sidebar: {type: Array, required: true},
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
.sidebar {
	.sections {
		margin-top: 2.5em;

		// .section {
		// 	background-color: $white1;
		// 	border: 1px solid $blue2;
		// 	border-radius: 4px;
		// 	padding: 1.5em 1.25em;
		// 	margin-bottom: 1.25em;
		//
		// 	.wrap {
		// 		transform: scale(0.95);
		// 		margin: -$fieldMargin 0;
		// 	}
		//
		// 	&.vStatusSet {
		// 		padding: 0;
		//
		// 		.wrap {
		// 			transform: none;
		// 		}
		// 	}
		// }
	}
}
</style>
