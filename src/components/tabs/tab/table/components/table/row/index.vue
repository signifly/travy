<template>
	<tbody class="row" :style="style">
		<tr>
			<td class="space" />

			<move v-if="sort" v-bind="{sort}" />

			<expandToggle v-if="expand" :expanded.sync="expanded" />

			<td v-if="selected.active">
				<vselect v-bind="{selected, rowData}" />
			</td>

			<td v-for="column in columns" :key="column.attribute">
				<rowField v-bind="{data, column, state}" @event="event" />
			</td>
		</tr>

		<expandView v-if="expanded" v-bind="{data, expand}" @event="event" />
	</tbody>
</template>

<script>
import {transProps, mergeData} from "@/modules/utils";
import {debounce, cloneDeep} from "lodash";
import expandToggle from "./expand/toggle";
import {operator} from "@/modules/utils";
import expandView from "./expand/view";
import vselect from "./select";
import rowField from "./field";
import produce from "immer";
import move from "./move";

export default {
	components: {move, vselect, rowField, expandToggle, expandView},
	props: {
		modifiers: {type: Object, required: false},
		endpoint: {type: Object, required: false},
		selected: {type: Object, required: true},
		row: {type: Object, default: () => ({})},
		expand: {type: Object, required: false},
		rowData: {type: Object, required: true},
		columns: {type: Array, required: true},
		state: {type: Object, request: true},
		sort: {type: Object, request: false}
	},
	data: (t) => ({
		data: cloneDeep(t.rowData),
		expanded: false,
		payload: {}
	}),
	computed: {
		url: (t) =>
			transProps({
				val: `${t.endpoint.url}/{id}`,
				data: t.data
			}),

		style() {
			const rowData = this.rowData;
			const row = this.row;

			return {
				get background() {
					if (!row.background) return null;

					const active = operator({
						...row.background.active,
						data: rowData
					});

					return active && row.background.color;
				}
			};
		}
	},
	methods: {
		event(event) {
			const update = event.actions.update;

			if (update) {
				this.data = mergeData(this.data, update.data);
				this.payload = mergeData(this.payload, update.data);

				const newEvent = produce(event, (event) => {
					event.actions.update.item = this.data;
				});

				// only update if we're making an update request
				if (this.endpoint) {
					this.update(newEvent);
				} else {
					this.$emit("event", newEvent);
				}
			} else {
				this.$emit("event", event);
			}
		},

		async update(event) {
			await this.$axios.put(this.url, {
				modifier: this.modifiers,
				data: this.payload
			});

			this.$emit("event", event);
		}
	},

	created() {
		this.update = debounce(this.update, 1000);
	}
};
</script>

<style lang="scss" scoped>
.row {
	&.sortable-chosen {
		background-color: #fff;
	}
}
</style>
