<template>
	<div class="table" v-if="mounted">
		<components
			:is="vTable"
			v-bind="{columns}"
			:data="columnsData"
			:defaults="{}"
			:modifiers="[]"
			:endpoints="{}"
			:selected="[]"
			:batch="{}"
		/>
	</div>
</template>

<script>


export default {
	props: {
		props: {type: Object, required: true},
		columns: {type: Array, required: true},
		columnsData: {type: Array, required: true}
	},
	computed: {
		vTable: (t) => require("@/components/tables/components/table.vue").default // stuff happens
	},
	data() {
		return {
			mounted: false,
			opts: {
				label: false
			},
			data: {
				// value: this.value
			}
		}
	},
	methods: {

	},
	mounted() {
		this.mounted = true;
	}
};
</script>

<style lang="scss" scoped>
.table {

}
</style>
