<template>
	<div class="table">
		<table>
			<vHead
				v-bind="{columns, selected, data, expand}"
				@getData="$emit('getData')"
			/>

			<row
				:key="row.id"
				v-for="row in data"
				@event="$emit('event', $event)"
				v-bind="{row, columns, endpoint, selected, expand}"
			/>
		</table>

		<div class="info" v-if="data.length === 0">
			<div class="nodata" v-if="!loading">no data</div>
			<div class="loading" v-if="loading">loading</div>
		</div>
	</div>
</template>

<script>
import vHead from "./head";
import row from "./row";

export default {
	components: {vHead, row},
	props: {
		selected: {type: Object, default: () => ({})},
		loading: {type: Boolean, required: false},
		endpoint: {type: Object, required: false},
		expand: {type: Object, required: false},
		columns: {type: Array, required: true},
		data: {type: Array, required: false}
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
			tbody {
				&:nth-child(odd) {
					tr {
						background-color: #fafafa;
					}
				}
			}

			th,
			td {
				border: 1px solid #ebeef5;
				border-right: 0;
				border-left: 0;
			}
		}
	}

	.info {
		padding: 2em;
		color: #909399;
		text-align: center;
		border-bottom: 1px solid #ebeef5;
	}
}
</style>
