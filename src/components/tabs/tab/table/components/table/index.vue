<template>
	<div class="table">
		<draggable tag="table" v-model="dataC" @end="move" handle=".move">
			<vHead
				v-bind="{columns, selected, expand, sort}"
				@getData="$emit('getData')"
				:data="dataC"
				slot="header"
			/>

			<row
				:key="row.id"
				v-for="row in dataC"
				@event="$emit('event', $event)"
				v-bind="{row, columns, endpoint, selected, expand, sort}"
			/>
		</draggable>

		<div class="info" v-if="dataC.length === 0">
			<div class="nodata" v-if="!loading">no data</div>
			<div class="loading" v-if="loading">loading</div>
		</div>
	</div>
</template>

<script>
import {cloneDeep, debounce} from "lodash";
import draggable from "vuedraggable";
import state from "../../state";
import vHead from "./head";
import row from "./row";

export default {
	components: {draggable, vHead, row},
	props: {
		loading: {type: Boolean, required: false},
		endpoint: {type: Object, required: false},
		selected: {type: Object, required: true},
		expand: {type: Object, required: false},
		columns: {type: Array, required: true},
		data: {type: Array, required: false},
		sort: {type: Object, request: false}
	},
	data: (t) => ({
		dataC: cloneDeep(t.data),
		state
	}),
	methods: {
		move: debounce(async function() {
			await this.$axios.post(`${this.endpoint.url}/move`, {
				position: this.data[0][this.sort.move.value],
				ids: this.dataC.map((x) => x.id),
				value: this.state.query.sort
			});
		}, 1000)
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
