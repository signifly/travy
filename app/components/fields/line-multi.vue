<template>
	<div class="line-multi">
		multi
	</div>
</template>

<script>

export default {
	meta: {
		res: {
			props: {
				items: "models",
				itemFieldId: "vLine",
				itemFieldProps: {
					titleKey: "modal",
					titleValue: "titleValue",
					infoKey: "variants",
					infoItems: "infoItems",
					infoItemKey: "name",
					switchTitle: "a switch",
					switchValue: "switchValue",
					actions: [
						{
							title: "Delete",
							type: "delete",
							description: "delete this?"
						},
						{
							title: "View",
							type: "show",
							endpoint: "stock-item-models/{id}"
						}
					]
				}
			},
			data: {
				models: [
					{
						titleValue: "a modal",
						switchValue: false,
						infoItems: [
							{
								name: "okesf"
							},
							{
								name: "wef"
							}
						]
					},
					{
						title: "a model2",
						switchValue: false,
						infoItems: [
							{
								name: "okesf"
							},
							{
								name: "wef"
							}
						]
					}
				]
			}
		}
	},
	props: {
		items: {type: Array, required: true, doc: true},
		_itemFieldId: {type: String, required: true, doc: true},
		_itemFieldProps: {type: Object, required: true, doc: true}
	}
};
</script>

<style lang="scss" scoped>
.line-multi {

}
</style>
