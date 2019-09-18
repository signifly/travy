<template>
	<div class="table">
		<vTable
			ref="table"
			:data="data"
			:columns="_columns"
			@event="$emit('event', $event)"
		/>
	</div>
</template>

<script>
import vTable from "@/pages/table/components/table";

export default {
	components: {vTable},
	meta: {
		res: {
			props: {
				data: "data",
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
				data: [
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
		_columns: {type: Array, required: true},
		data: {type: Array, required: true}
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
