<template>
	<div class="table" :class="{loading}">
		<table>
			<vHead v-bind="{columns}" />
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
		batch: {type: Object, default: () => ({})},
		defaults: {type: Object, default: () => ({})}
	},
	computed: {
		query: () => state.query,
		emptyText: (t) => (t.loading ? "loading" : "no data"),
		sorting: (t) => t.query.sort || t.defaults.sort || {},
		batchActive: (t) => t.batch.bulk || t.batch.sequential
	},
	methods: {
		sort({prop, order}) {
			const sort = prop && order ? {prop, order} : undefined;

			// don't set query params for default sorting
			if (this.data.length)
				state.setQuery({
					type: "replace",
					query: {
						...this.query,
						page: undefined,
						sort
					}
				});

			this.$emit("getData");
		},

		select(items) {
			this.$emit("select", items);
		},

		unselect() {
			this.$refs.table.clearSelection();
		}
	},
	created() {
		// element ui will call sort-change on init if any sorting is defined
		if (Object.keys(this.sorting).length === 0) {
			this.$emit("getData");
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
