<template>
	<div class="tabs">
		<vTabsGen v-bind="{tabs, tabId}" @tabClick="tabClick">
			<template slot="label" slot-scope="tab">
				<vLabel v-bind="{tab, options, edits, dataU, nodatas}"></vLabel>
			</template>

			<template slot="content" slot-scope="tab">
				<vTab :key="dataU" v-bind="{tab, data, options, errors}" @fieldA="$emit('fieldA', $event)" @nodata="nodata" />
			</template>
		</vTabsGen>
	</div>
</template>

<script>
import vTabsGen from "@/components/tabs.vue";
import vLabel from "./label.vue";
import vTab from "./tab.vue";

export default {
	components: {vTabsGen, vLabel, vTab},
	props: {
		tabs: {type: Array, required: true},
		data: {type: Object, required: true},
		dataU: {type: Number, required: true},
		edits: {type: Object, required: true},
		errors: {type: Object, required: false},
		options: {type: Object, required: false}
	},
	data() {
		return {
			nodatas: {}
		}
	},
	computed: {
		tabId: (t) => t.$route.params.tabId || "basic"
	},
	methods: {
		tabClick({tabId}) {
			this.$router.push({...this.$route, params: {tabId}});
		},

		nodata(data) {
			this.nodatas = {...this.nodatas, ...data};
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {

}
</style>
