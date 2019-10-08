<template>
	<div class="tabs">
		<labels v-bind="{tab, tabs, edit}" />
		<tab
			ref="tab"
			v-bind="[tab, {data}]"
			@edit="$emit('update:edit', $event)"
		/>
	</div>
</template>

<script>
import labels from "./labels";
import tab from "./tab";

export default {
	components: {labels, tab},
	props: {
		edit: {type: Boolean, required: false},
		data: {type: Object, required: false},
		tabs: {type: Array, required: true}
	},
	computed: {
		tab() {
			const tab = this.tabs.find((x) => x.id === this.$route.query.tab);
			return tab || this.tabs[0];
		}
	},
	methods: {
		async save() {
			if (this.edit) {
				return await this.$refs.tab.save();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	background-color: #ffffff;
	border: 1px solid #e0e6ed;
	border-radius: 4px;
}
</style>
