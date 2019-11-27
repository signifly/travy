<template>
	<div class="table">
		<vTable
			:selected="{active: false, items: []}"
			:columns="_columns"
			@event="update"
			:state="state"
			:data="value"
			ref="table"
		/>
	</div>
</template>

<script>
import vTable from "@/components/tabs/tab/table/components/table";
import state from "@/components/tabs/tab/table/state";
import produce from "immer";

export default {
	components: {vTable},
	meta: {
		spec: "props",
		res: {
			props: {
				value: "value",
				_columns: [
					{
						name: "text",
						label: "text",
						fieldType: {
							id: "text",
							props: {
								text: "text"
							}
						}
					},
					{
						name: "switch",
						label: "switch",
						fieldType: {
							id: "input-toggle",
							props: {
								value: "toggle"
							}
						}
					}
				]
			},
			data: {
				value: [
					{
						toggle: false,
						text: "text",
						id: 1
					},
					{
						toggle: false,
						text: "text",
						id: 2
					}
				]
			}
		}
	},
	props: {
		_columns: {type: Array, required: true, note: "see table definitions"},
		value: {type: Array, required: true}
	},
	data: () => ({
		state: state()
	}),
	methods: {
		update(event) {
			const update = event.actions.update;

			if (update) {
				const item = update.item;
				const index = this.value.findIndex((x) => x.id === item.id);

				const newEvent = produce(event, (event) => {
					event.actions.update.data = {value: [...this.value]};
					event.actions.update.data.value[index] = item;
				});

				this.$emit("event", newEvent);
			} else {
				this.$emit("event");
			}
		}
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
