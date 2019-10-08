<template>
	<div class="labels">
		<vLabel
			v-for="item in tabs"
			:active="tab === item"
			:name="item.name"
			:key="item.id"
			:id="item.id"
			:edit="edit"
		/>
	</div>
</template>

<script>
import vLabel from "./label";

export default {
	components: {vLabel},
	props: {
		edit: {type: Boolean, required: false},
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
