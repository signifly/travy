<template>
	<div class="sidebar">
		<div class="sections">
			<vSection v-for="section in sections" :key="section.id" v-bind="[section, {data}]" @fieldA="fieldA" />
		</div>
	</div>
</template>

<script>
import vField from "@/components/field";
import vSection from "./section.vue";

export default {
	components: {vField, vSection},
	props: {
		sidebar: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		sections: (t) => t.sidebar ? t.sidebar.sections : []
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
