<template>
	<div class="modifiers">
		<div class="item" v-for="item in items">
			<div class="title">{{item.title}}</div>
			<Select filterable v-model="item.value" size="medium">
				<Option v-for="option in item.options" v-bind="option" :key="option.value">
					<div class="option">
						<div class="icon" v-if="option.icon && icon(option.icon)"><img :src="icon(option.icon)"></div>
						{{option.label}}
					</div>
				</Option>
			</Select>
		</div>
		</div>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	props: {
		modifiers: {type: Array, required: true}
	},
	data() {
		return {
			items: this.modifiers
		}
	},
	methods: {
		icon(file) {
			try {
				return require(`!file-loader!@/assets/icons/${file}.svg`);
			} catch(err) {
				console.log(err);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.modifiers {
	display: flex;

	.item {
		display: flex;
		align-items: center;
		margin-left: 2em;

		.title {
			margin-right: 1em;
			font-size: em(14);
		}
	}
}

.option {
	display: flex;
	align-content: center;

	.icon {
		display: flex;
		align-items: center;
		width: 1.2em;
		margin-right: 0.75em;
	}
}
</style>
