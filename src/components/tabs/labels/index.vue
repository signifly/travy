<template>
	<div class="labels">
		<vLabel
			v-for="item in tabs"
			:active="tab === item"
			:name="item.name"
			:state="state"
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
		state: {type: Object, required: true},
		tabs: {type: Array, required: true},
		tab: {type: Object, required: true}
	}
};
</script>

<style lang="scss" scoped>
.labels {
	border-bottom: 1px solid $blue6;
	height: 55px;
}
</style>
