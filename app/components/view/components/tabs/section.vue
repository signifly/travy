<template>
	<div class="section">
		<div class="title">
			{{section.title}}

			<Tag v-if="outdated" size="small" class="status" type="warning">Outdated</Tag>
			<Tag v-if="nodata" size="small" class="status" type="danger">No data</Tag>
		</div>

		<div class="fields">
			<field v-for="field in fields" v-bind="{field, data, options, errors}" :key="field.name" @fieldA="fieldA" @nodata="fieldsDataSet" ref="field"/>
		</div>
	</div>
</template>

<script>
import {get} from "lodash";
import {Tag} from "element-ui";
import field from "./field.vue";

export default {
	components: {Tag, field},
	props: {
		section: {type: Object, required: true},
		data: {type: Object, required: true},
		options: {type: Object, required: true},
		errors: {type: Object, required: false}
	},
	data() {
		return {
			fieldsData: {}
		}
	},
	computed: {
		field: (t) => t.section.field,
		fields: (t) => t.section.fields,
		nodata: (t) => Object.values(t.fieldsData).some(x => x),
		outdated: (t) => t.fields.some(x => get(t.options, [x.name, "outdated"]))
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", {...obj, section: this.section.id});
		},
		fieldsDataSet({id, nodata}) {
			this.$set(this.fieldsData, id, nodata);
		}
	}
};
</script>

<style lang="scss" scoped>
.section {
	margin-bottom: 4em;

	&:last-child {
		margin-bottom: 1.5em;
	}

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
		margin: -$fieldMargin 0;
	}
}
</style>
