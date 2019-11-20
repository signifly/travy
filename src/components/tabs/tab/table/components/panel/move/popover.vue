<template>
	<div class="popover">
		<div class="text">
			Move to position out of 1334
		</div>

		<div class="position">
			<Select
				v-model="value"
				size="small"
				placeholder="Select"
				:style="{width: '60%'}"
			>
				<Option label="Top" value="top" />
				<Option label="Bottom" value="bottom" />
				<Option label="Position" value="position" />
			</Select>

			<InputNumber
				v-if="value === 'position'"
				v-model="position"
				controls-position="right"
				:style="{width: '35%'}"
				size="small"
				:min="1"
				:max="10"
			/>
		</div>

		<div class="bottom">
			<Button size="mini" type="primary" :disabled="!value" @click="move">
				Confirm
			</Button>
		</div>
	</div>
</template>

<script>
import {Button, Select, Option, InputNumber} from "element-ui";

export default {
	components: {Button, Select, Option, InputNumber},
	data: () => ({
		loading: false,
		position: 0,
		value: ""
	}),
	methods: {
		move() {
			this.value = "";
			this.$emit("close");
		}
	}
};
</script>

<style lang="scss" scoped>
.popover {
	padding: 0.75em;
	font-size: 12px;
	font-weight: 500;

	.position {
		margin: 1em 0 2em;
		display: flex;
		justify-content: space-between;
	}

	.bottom {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
