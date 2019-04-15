<template>
	<div class="key-value-box">
		<div class="item" v-for="item in items" :key="item.label">
			<div class="label" v-text="`${item.label}:`" />
			<div class="value" v-text="item.value" />
		</div>
	</div>
</template>

<script>
import {get} from "lodash";

export default {
	meta: {
		res: {
			props: {
				items: [
					{label: "Client1", value: "name"},
					{label: "Client2", value: "people[0].name"}
				]
			},
			data: {
				name: "pete1",
				people: [{name: "Pete2222"}]
			}
		}
	},
	props: {
		_items: {type: Array, required: true, doc: true},
		alt: {type: Object, required: true}
	},
	computed: {
		data: (t) => t.alt.data,
		items: (t) =>
			t._items.map((x) => ({
				value: get(t.data, x.value),
				label: x.label
			}))
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
