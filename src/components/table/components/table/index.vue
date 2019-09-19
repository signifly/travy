<template>
	<div class="table" :class="{loading}">
		<table>
			<vHead v-bind="{columns}" @getData="$emit('getData')" />
			<rows
				v-bind="{columns, data, endpoint, modifiers}"
				@event="$emit('event', $event)"
			/>
		</table>
	</div>
</template>

<script>
import state from "../../state";
import vHead from "./head";
import rows from "./rows";

export default {
	components: {vHead, rows},
	props: {
		data: {type: Array, required: false},
		columns: {type: Array, required: true},
		endpoint: {type: Object, required: false},
		metadata: {type: Object, required: false},
		subtable: {type: Object, required: false},
		loading: {type: Boolean, required: false},
		modifiers: {type: Object, required: false},
		batch: {type: Object, default: () => ({})}
	},
	computed: {
		query: () => state.query,
		emptyText: (t) => (t.loading ? "loading" : "no data"),
		batchActive: (t) => t.batch.bulk || t.batch.sequential
	},
	methods: {
		select(items) {
			this.$emit("select", items);
		},

		unselect() {
			this.$refs.table.clearSelection();
		}
	}
};
</script>

<style lang="scss" scoped>
.table {
	font-size: 14px;

	table {
		width: 100%;
		border-collapse: collapse;

		::v-deep {
			th,
			td {
				border-bottom: 1px solid #ebeef5;
			}

			th {
				border-top: 1px solid #ebeef5;
			}
		}
	}
}
</style>
