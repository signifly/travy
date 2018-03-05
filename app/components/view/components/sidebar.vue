<template>
	<div class="sidebar">
		<div class="items">
			<div class="item" v-if="items" v-for="item in items">
				<div class="wrap">
					<vField v-for="field in item.fields" :key="field.name" v-bind="[field, {data}]" @fieldA="fieldA" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vField from "@/components/field.vue";

export default {
	components: {vField},
	props: {
		sidebar: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		items: (t) => t.sidebar.items
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
	.items {
		margin-top: 2.5em;
		.item {
			background-color: $white1;
			border: 1px solid $blue2;
			border-radius: 4px;
			padding: 1.5em 1.25em;
			margin-bottom: 1.25em;

			> .wrap {
				transform: scale(0.95);
			}
		}
	}
}
</style>
