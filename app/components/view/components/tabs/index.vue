<template>
	<div class="tabs">
		<vTabs v-bind="{tabs, tab}" @tab="tabClick">
			<template slot="label" slot-scope="item">
				<vLabel v-bind="item" :edits="edits" :refs="refs"></vLabel>
			</template>

			<template slot="content" slot-scope="tab">
				<vTab v-bind="{tab, data, errors}" :key="dataU" @fieldA="$emit('fieldA', $event)" :ref="tab.id"/>
			</template>
		</vTabs>
	</div>
</template>

<script>
import vTabs from "@/components/tabs.vue";
import vLabel from "./label.vue";
import vTab from "./tab.vue";

export default {
	components: {vTabs, vLabel, vTab},
	props: {
		tabs: {type: Array, required: true},
		data: {type: Object, required: true},
		edits: {type: Object, required: true},
		errors: {type: Object, required: false},
		dataU: {type: Number, required: true}
	},
	data() {
		return {
			mounted: false
		}
	},
	computed: {
		tab: (t) => t.$route.params.tab || "basic",
		refs: (t) => t.mounted ? t.$refs : null
	},
	methods: {
		tabClick(tab) {
			this.$router.push({...this.$route, params: {tab}});
		}
	},
	mounted() {
		this.mounted = true;
	}
};
</script>

<style lang="scss" scoped>
.tabs {

}
</style>
