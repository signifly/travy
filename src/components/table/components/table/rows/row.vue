<template>
	<tr>
		<td v-for="column in columns" :key="column.name">
			<item v-bind="{data: data, column}" @event="event" />
		</td>
	</tr>
</template>

<script>
import {mergeData, mapPaths, rStringProps} from "@/modules/utils";
import {debounce, cloneDeep} from "lodash";
import produce from "immer";
import item from "./item";

export default {
	components: {item},
	props: {
		modifiers: {type: Object, required: false},
		endpoint: {type: Object, required: false},
		columns: {type: Array, required: true},
		row: {type: Object, required: true}
	},
	data: (t) => ({
		data: cloneDeep(t.row),
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

<style lang="scss" scoped>
tr {
	&:nth-child(even) {
		background-color: #fafafa;
	}
}
</style>
