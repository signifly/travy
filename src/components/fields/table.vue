<template>
	<div class="table">
		<vTable
			:selected="{active: false, items: []}"
			@event="$emit('event', $event)"
			:columns="_columns"
			:state="state"
			:data="value"
			ref="table"
		/>
	</div>
</template>

<script>
import vTable from "@/components/tabs/tab/table/components/table";
import state from "@/components/tabs/tab/table/state";

export default {
	components: {vTable},
	meta: {
		spec: "props",
		res: {
			props: {
				value: "value",
				_columns: [
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
						name: "text",
						label: "text",
						fieldType: {
							id: "text",
							props: {
								text: "text"
							}
						}
					}
				]
			},
			data: {
				value: [
					{
						id: 1,
						title: "title",
						text: "text"
					},
					{
						id: 2,
						title: "title",
						text: "text"
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
	})
};
</script>

<style lang="scss" scoped>
.table {
	border: 0.5px solid $blue2;
	border-top: 0;
	border-bottom: 0;
}
</style>
