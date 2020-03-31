<template>
	<div class="select-multi-search-table">
		<div class="select">
			<selectMultiSearch ref="select" v-bind="select" @event="selectEvent" />
		</div>
		<vTable
			:__props="{columns: table.columns}"
			@event="tableEvent"
			:key="data.length"
			:value="data"
		/>
	</div>
</template>

<script>
import selectMultiSearch from "./input-select-multi-search.vue";
import vTable from "./table";

const selectProps = selectMultiSearch.meta.res.props;
const selectSpec = selectMultiSearch.meta.spec;

export default {
	components: {selectMultiSearch, vTable},
	meta: {
		spec: {
			select: {type: Object, required: true, children: selectSpec},
			table: {
				type: Object,
				required: true,
				note: "see table definitions",
				children: {
					columnsData: {type: Object, required: false},
					columns: {type: Array, required: true}
				}
			},
			value: {type: Array, required: true}
		},
		res: {
			props: {
				value: "{value}",
				select: selectProps,
				table: {
					columns: [
						{
							name: "title",
							label: "Title",
							fieldType: {
								id: "text",
								props: {
									text: "{name}"
								}
							}
						},
						{
							name: "switch",
							label: "Switch",
							fieldType: {
								id: "input-toggle",
								props: {
									value: "{bool}"
								}
							}
						},
						{
							name: "text",
							label: "text",
							fieldType: {
								id: "input-text",
								props: {
									value: "{text}"
								}
							}
						}
					],

					columnsData: {
						is_mandatory: true
					}
				}
			},
			data: {
				value: [
					{
						id: 1,
						name: "item1",
						bool: false,
						image: "https://picsum.photos/id/135/600/600",
						is_mandatory: true
					}
				]
			}
		}
	},
	props: {
		value: {type: Array, default: () => []},
		__props: {type: Object, required: true},
		select: {type: Object, required: true}
	},
	computed: {
		table: (t) => t.__props.table,
		data: (t) => t.select.value
	},
	methods: {
		selectEvent(event) {
			const update = event.actions.update;

			if (update) {
				const items = update.data.value;

				const data = items.map((value) => {
					// find data item by all properties of value
					const item = this.data.find((item) => {
						return Object.entries(value).every(([k, v]) => item[k] === v);
					});

					return {
						...value,
						...item,
						...this.table.columnsData
					};
				});

				this.update(data);
			}
		},

		tableEvent(event) {
			this.$emit("event", event);
		},

		update(value) {
			this.$emit("event", {
				actions: {
					update: {data: {value}}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.select-multi-search-table {
	.select {
		margin-bottom: 1em;
	}
}
</style>
