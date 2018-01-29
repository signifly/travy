<template>
	<div class="section">
		<div class="title">
			{{section.title}}
			<Tag v-if="nodata" size="small" class="status" type="danger">No data</Tag>
		</div>

		<vDrag v-if="draggable"></vDrag>

		<div class="fields" v-else>
			<field v-for="field in fields" v-bind="{field, data}" :key="field.name" @update="update" ref="field"/>
		</div>
	</div>
</template>

<script>
import {map, pick} from "lodash";
import {Tag} from "element-ui";
import field from "./field.vue";
import {vDrag} from "@/components/fields";

export default {
	components: {Tag, field, vDrag},
	props: {
		section: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			mounted: false
		}
	},
	computed: {
		fields: (t) => t.section.fields,
		draggable: (t) => t.section.draggable,
		nodata() {
			if (!this.mounted) return;
			return false;
			// return this.$refs.field.some(x => x.nodata);
		}
	},
	methods: {
		update({data}) {
			this.$emit("update", {
				data,
				section: this.section.id
			});
		}
	},
	mounted() {
		this.mounted = true;
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
