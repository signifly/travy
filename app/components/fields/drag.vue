<template>
	<div class="drag">
		<draggable v-model="dd" @start="drag=true" @end="drag=false">
			<div v-for="d in dd" :key="d.id">{{d.title}}</div>
		</draggable>
	</div>
</template>

<script>
const draggable = () => import(/* webpackChunkName: "vuedraggable" */ "vuedraggable");

export default {
	components: {draggable},
	data() {
		return {
			dd: [
				{
					id: "sd",
					title: "awd"
				},
				{
					id: "2324",
					title: "1ef"
				}
			]
		}
	}
};
</script>

<style lang="scss" scoped>
.drag {

}
</style>
