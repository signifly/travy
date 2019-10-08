<template>
	<div class="table">
		<vTable
			ref="table"
			:data="value"
			:columns="_columns"
			@event="$emit('event', $event)"
		/>
	</div>
</template>

<script>
import vTable from "@/components/tabs/tab/table/components/table";

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
						id: 0,
						title: "title",
						text: "text",
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
		_columns: {type: Array, required: true, note: "see table definitions"},
		value: {type: Array, required: true}
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
