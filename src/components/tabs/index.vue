<template>
	<div class="tabs">
		<labels v-bind="{tab, tabs: tabsC, edit, state}" />
		<tab
			ref="tab"
			v-bind="[tab, {data}]"
			@edit="$emit('update:edit', $event)"
		/>
	</div>
</template>

<script>
import router from "@/modules/router";
import labels from "./labels";
import tab from "./tab";

const state = () => ({
	query: {...router.currentRoute.query},

	setQuery(query) {
		this.query = query;

		if (router.currentRoute.name !== "dashboard") {
			router.replace({query}).catch(() => {});
		}
	}
});

export default {
	components: {labels, tab},
	props: {
		edit: {type: Boolean, required: false},
		data: {type: Object, required: false},
		tabs: {type: Array, required: true}
	},
	data: () => ({
		state: state()
	}),
	computed: {
		tabsC: (t) =>
			t.tabs.map((x) => ({
				...x,
				id: x.name.replace(" ", "-").toLowerCase()
			})),

		tab() {
			const tab = this.tabsC.find((x) => x.id === this.state.query.tab);
			return tab || this.tabsC[0];
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
