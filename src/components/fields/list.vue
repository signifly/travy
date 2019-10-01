<template>
	<div class="key-value-box">
		<div class="item" v-for="item in items" :key="item.label">
			<div class="label" v-text="item.label" />
			<div class="value" v-text="item.value" />
		</div>
	</div>
</template>

<script>
export default {
	meta: {
		spec: {
			items: {
				type: Object,
				required: true,
				children: {
					value: {type: [String, Number], required: false},
					"@scope": {type: Array, required: true},
					label: {type: String, required: true}
				}
			}
		},
		res: {
			props: {
				items: {
					"@scope": "items",
					label: "label",
					value: "value"
				}
			},
			data: {
				items: [
					{label: "label1", value: "value1"},
					{label: "label2", value: "value2"}
				]
			}
		}
	},
	props: {
		items: {type: Array, required: true}
	}
};
</script>

<style lang="scss" scoped>
.key-value-box {
	padding: 12px 22px;
	display: flex;
	flex-direction: column;

	.item {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		font-weight: 500;
		margin: 0.4em 0;
	}
}
</style>
