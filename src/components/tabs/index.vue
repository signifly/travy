<template>
	<div class="tabs">
		<labels v-bind="{tab, tabs}" />
		<tab v-bind="tab" />
	</div>
</template>

<script>
import labels from "./labels";
import tab from "./tab";

export default {
	components: {labels, tab},
	props: {
		tabs: {type: Array, required: true}
	},
	computed: {
		tab() {
			const tab = this.tabs.find((x) => x.id === this.$route.query.tab);
			return tab || this.tabs[0];
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
