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
				@event="$emit('event', $event)"
				v-for="rowData in dataC"
				:key="rowData.id"
				v-bind="{
					endpoint,
					selected,
					rowData,
					columns,
					expand,
					state,
					sort,
					row
				}"
			/>
		</draggable>

		<div class="info" v-if="dataC.length === 0">
			<div class="nodata" v-if="!loading">no data</div>
			<div class="loading" v-if="loading">loading</div>
		</div>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import {debounce} from "lodash";
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
		state: {type: Object, required: true},
		sort: {type: Object, request: false},
		row: {type: Object, required: false},
		data: {type: Array, required: true}
	},
	computed: {
		dataC: {
			get() {
				return this.data;
			},
			set(data) {
				this.$emit("update:data", data);
			}
		}
	},
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
		border-collapse: collapse;
		width: 100%;

		::v-deep {
			th,
			td {
				border-bottom: 1px solid $blue6;
				word-break: break-word;
			}

			tbody:last-child td {
				border-bottom: 0;
			}
		}
	}

	.info {
		text-align: center;
		color: #909399;
		padding: 2em;
	}
}
</style>
