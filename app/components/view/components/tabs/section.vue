<template>
	<div class="section">
		<div class="title">
			{{section.title}}
			<Tag v-if="nodata" size="small" class="status" type="danger">No data</Tag>
		</div>

		<div class="fields" v-if="!draggable">
			<field v-for="field in fields" v-bind="{field, data}" :key="field.name" @update="update" @nodata="fieldsDataSet" ref="field"/>
		</div>

		<vDrag v-else v-bind="{field, data, draggable}" @update="update" element="div" class="fields"/>
	</div>
</template>

<script>
import {Tag} from "element-ui";
import field from "./field.vue";
import vDrag from "./drag.vue";

export default {
	components: {Tag, field, vDrag},
	props: {
		section: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			fieldsData: {}
		}
	},
	computed: {
		field: (t) => t.section.field,
		fields: (t) => t.section.fields,
		draggable: (t) => t.section.draggable,
		nodata: (t) => Object.values(t.fieldsData).some(x => x)
	},
	methods: {
		update({data}) {
			this.$emit("update", {
				section: this.section.id,
				data
			});
		},
		fieldsDataSet({id, nodata}) {
			this.$set(this.fieldsData, id, nodata);
		}
	}
};
</script>

<style lang="scss" scoped>
.section {
	margin-bottom: 1.5em;

	.title {
		font-size: em(14);
		font-weight: 500;
		border-bottom: 1px solid $black1;
		padding-bottom: 1.2em;
		margin-bottom: 1.2em;
		height: 1.3em;
		display: flex;
		align-items: center;

		.status {
			margin-left: 1em;
		}
	}
	.fields {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
