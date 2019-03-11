<template>
	<div class="sections">
		<vSection v-for="section in sections" :key="section.id" v-bind="{section}"/>
	</div>
</template>

<script>
import vSection from "./section";

export default {
	components: {vSection},
	props: {
		sections: {type: Array, required: true}
	}
};
</script>

<style lang="scss" scoped>
.sections {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>
