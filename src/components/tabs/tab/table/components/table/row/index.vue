<template>
	<tbody>
		<tr>
			<td v-if="expand">
				<expandToggle :expanded.sync="expanded" v-if="expand" />
			</td>
			<td v-if="selected.active"><vselect v-bind="{selected, row}" /></td>
			<td v-for="column in columns" :key="column.name">
				<rowField v-bind="{data: data, column}" @event="event" />
			</td>
		</tr>

		<tr v-if="expanded">
			<td colspan="100%">
				<expandView v-bind="{data, expand}" @event="event" />
			</td>
		</tr>
	</tbody>
</template>

<script>
import {mergeData, mapPaths, rStringProps} from "@/modules/utils";
import {debounce, cloneDeep} from "lodash";
import expandToggle from "./expand/toggle";
import expandView from "./expand/view";
import vselect from "./select";
import rowField from "./field";
import produce from "immer";

export default {
	components: {vselect, rowField, expandToggle, expandView},
	props: {
		modifiers: {type: Object, required: false},
		endpoint: {type: Object, required: false},
		selected: {type: Object, required: true},
		expand: {type: Object, required: false},
		columns: {type: Array, required: true},
		row: {type: Object, required: true}
	},
	data: (t) => ({
		data: cloneDeep(t.row),
		expanded: false,
		payload: {}
	}),
	computed: {
		url: (t) =>
			rStringProps({
				val: `${t.endpoint.url}/{id}`,
				data: t.data
			})
	},
	methods: {
		event(event) {
			const update = event.actions.update;

			if (update) {
				const data = mapPaths(update.data);
				this.data = mergeData(this.data, data);
				this.payload = mergeData(this.payload, data);

				const newEvent = produce(event, (event) => {
					event.actions.update.item = this.data;
				});

				// only update if we're making an update request
				if (this.endpoint) {
					this.update(newEvent);
				} else {
					this.$emit("event", newEvent);
				}
			}
		},

		async update(event) {
			await this.$axios.put(this.url, {
				data: this.payload,
				modifier: this.modifiers
			});

			this.$emit("event", event);
		}
	},

	created() {
		this.update = debounce(this.update, 1000);
	}
};
</script>
