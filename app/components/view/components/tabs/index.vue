<template>
	<div class="tabs">
		<vTabs v-bind="{tabs, tab}" @tab="tabClick">
			<template slot="label" slot-scope="item">
				<vLabel v-bind="item" :edit="edit" :refs="refs"></vLabel>
			</template>

			<template slot="content" slot-scope="tab">
				<vTab v-bind="{tab, data}" @fieldA="fieldA" :ref="tab.id"/>
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
		data: {type: Object, required: true}
	},
	data() {
		return {
			mounted: false,
			edit: {}
		}
	},
	computed: {
		tab: (t) => t.$route.params.tab || "basic",
		refs() {
			if (!this.mounted) return;
			return this.$refs;
		}
	},
	methods: {
		fieldA(obj) {
			this.$set(this.edit, obj.tab, true);
			this.$emit("fieldA", obj);
		},
		tabClick(id) {
			this.$router.push({params: {tab: id}});
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
