<template>
	<div class="table" v-if="mounted">
		<vTable
			ref="table"
			:columns="columns"
			:data="columnsDataC"
			@event="event"
		/>
	</div>
</template>

<script>
import vTable from "@/pages/table/components/table";
import {mapPaths} from "@/modules/utils";
import {cloneDeep} from "lodash";

export default {
	components: {vTable},
	meta: {
		res: {
			props: {
				columnsData: "columnsData",
				columns: [
					{
						name: "title",
						label: "Title",
						fieldType: {
							id: "text",
							props: {
								text: "title"
							}
						}
					},
					{
						name: "input",
						label: "Input",
						fieldType: {
							id: "input-text",
							props: {
								value: "input"
							}
						}
					}
				]
			},
			data: {
				columnsData: [
					{
						id: 0,
						title: "sfef",
						statustext: "spflwe",
						status: "warning",
						dateStart1: 1325376000,
						dateEnd1: 1356998400,
						dateStart2: 1356998400,
						dateEnd2: 1356998400
					}
				]
			}
		}
	},
	props: {
		_columns: {type: Array, required: true, doc: true},
		columnsData: {type: Array, required: true, doc: true}
	},
	data() {
		return {
			columnsDataC: this.columnsData,
			columns: this._columns,
			mounted: false
		};
	},
	methods: {
		async event({actions, done}) {
			if (actions.update) {
				const {data, item} = actions.update;

				// don't mutate columnsData
				const columnsData = cloneDeep(this.columnsDataC);

				const columnItem = columnsData.find((x) => x.id === item.id);

				const columnData = mapPaths(data);

				Object.assign(columnItem, columnData);
				this.columnsDataC = columnsData;

				// used in conjunction with input-select-multi-search-table
				this.$emit("data", this.columnsDataC);

				if (done) await done();
			} else {
				this.$emit("event", {actions, done});
			}
		}
	},
	mounted() {
		this.mounted = true;
	}
};
</script>

<style lang="scss" scoped>
.table {
	border: 0.5px solid $blue2;
	border-top: 0;
	border-bottom: 0;
}
</style>
