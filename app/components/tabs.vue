<template>
	<div class="tabs">
		<Tabs type="card" v-model="active" @tab-click="click">
			<TabPane v-for="tab in tabs" :name="tab.id" :key="tab.id">
				<slot name="label" slot="label" v-bind="tab">label</slot>
				<slot name="content" v-bind="tab">content</slot>
			</TabPane>
 		</Tabs>
	</div>
</template>

<script>
import {Tabs, TabPane} from "element-ui";

export default {
	components: {Tabs, TabPane},
	props: {
		tabs: {type: Array, required: true},
		tab: {type: String, required: false}
	},
	data() {
		return {
			active: this.tab
		}
	},
	methods: {
		click() {
			this.$emit("tab", this.active);
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {

}
</style>
