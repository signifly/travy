<template>
	<div class="section">
		<div class="title">
			{{title}}
			<Tag v-if="outdated" size="small" class="status" type="warning">Outdated</Tag>
		</div>

		<div class="items">
			<div class="item" v-for="item in fields">
				<div class="label">
					{{item.label}}
					<span class="outdated" v-if="item.outdated"></span>
				</div>
				<Input v-model="item.value" :disabled="item.disabled" size="medium">
					<span class="unit" slot="suffix">{{item.unit}}</span>
				</Input>
			</div>
		</div>
	</div>
</template>

<script>
import {Input, Tag} from "element-ui";

export default {
	components: {Input, Tag},
	props: {
		title: {type: String, required: true},
		fields: {type: Array, required: true}
	},
	computed: {
		outdated: (t) => t.fields.some(x => x.outdated)
	}
};
</script>

<style lang="scss" scoped>
.section {
	margin-bottom: 1.5em;

	.title {
		font-size: em(14);
		border-bottom: 1px solid $black1;
		padding-bottom: 1.2em;
		margin-bottom: 1.2em;

		.status {
			margin-left: 0.5em;
		}
	}
	.items {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.item {
			width: calc(50% - 1em);
			margin-bottom: 1.5em;

			.label {
				font-size: em(14);
				color: $blue4;
				margin-bottom: 0.5em;

				display: flex;
				align-items: center;

				.outdated {
					display: block;
					$s: 0.7em;
					width: $s;
					height: $s;
					border-radius: 50%;
					background-color: $warning;
					margin-left: 0.5em;
				}
			}

			.el-input {
				.unit {
					user-select: none;
					height: 100%;
					display: flex;
					align-items: center;
					font-size: em(14);
					margin-right: 0.5em;
				}
			}
		}
	}
}
</style>
