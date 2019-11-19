<template>
	<div class="move">
		<Popover placement="top" width="300" ref="popover">
			<div class="pop">
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

			<Button size="medium" slot="reference">
				Move
				<i class="el-icon-d-caret el-icon-right" />
			</Button>
		</Popover>
	</div>
</template>

<script>
import {Popover, Button, Select, Option, InputNumber} from "element-ui";

export default {
	components: {Popover, Button, Select, Option, InputNumber},
	props: {
		sort: {type: Object, required: true}
	},
	data: () => ({
		loading: false,
		position: 0,
		value: ""
	}),
	methods: {
		move() {
			this.$refs.popover.showPopper = false;
			this.value = "";
		}
	}
};
</script>

<style lang="scss" scoped>
.move {
	display: flex;
	align-items: center;

	@at-root .pop {
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
}
</style>
