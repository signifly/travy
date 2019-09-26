<template>
	<div class="key-value-box">
		<div class="item" v-for="item in items" :key="item._label">
			<div class="label" v-text="`${item._label}:`" />
			<div class="value" v-text="item.value" />
		</div>
	</div>
</template>

<script>
export default {
	meta: {
		spec: "props",
		res: {
			props: {
				items: [
					{_label: "Client1", value: "name1"},
					{_label: "Client2", value: "name2"}
				]
			},
			data: {
				name1: "pete1",
				name2: "pete2"
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
	background-color: #f5f7fa;
	border: 1px solid #e2e4e8;
	border-radius: 2px;
	padding: 12px 22px;
	display: flex;
	flex-direction: column;

	.item {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		margin: 0.4em 0;

		.label {
			font-weight: 300;
		}
	}
}
</style>
