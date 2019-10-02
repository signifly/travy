<template>
	<div class="labels">
		<vLabel
			v-for="_tab in tabs"
			:name="_tab.name"
			:id="_tab.id"
			:active="tab === _tab"
			:key="_tab.id"
		/>
	</div>
</template>

<script>
import vLabel from "./label";

export default {
	components: {vLabel},
	props: {
		tabs: {type: Array, required: true},
		tab: {type: Object, required: true}
	}
};
</script>

<style lang="scss" scoped>
.labels {
	height: 55px;
	border-bottom: 1px solid #f5f7fa;
}
</style>
