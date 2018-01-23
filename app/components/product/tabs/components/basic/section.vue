<template>
	<div class="section">
		<div class="title">
			{{title}}
			<Tag v-if="outdated" size="small" class="status" type="warning">Outdated</Tag>
			<Tag v-if="nodata" size="small" class="status" type="danger">No data</Tag>
		</div>

		<div class="items">
			<div class="item" v-for="item in fields">
				<div class="label">
					{{item.label}}
					<span class="dot outdated" v-if="item.outdated"></span>
					<transition name="el-fade-in">
						<span class="dot nodata" v-if="!item.disabled && !item.value"></span>
					</transition>
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
		outdated: (t) => t.fields.some(x => x.outdated),
		nodata: (t) => t.fields.some(x => !x.disabled && !x.value)
	}
};
</script>

<style lang="scss" scoped>
.section {
	margin-bottom: 1.5em;

	.title {
		font-size: em(14);
		font-weight: 500;
		border-bottom: 1px solid $black1;
		padding-bottom: 1.2em;
		margin-bottom: 1.2em;
		height: 1.3em;
		display: flex;
		align-items: center;

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

				.dot {
					display: block;
					$s: 9px;
					width: $s;
					height: $s;
					border-radius: 50%;
					margin-left: 0.5em;

					&.outdated {
						background-color: $warning;
					}
					&.nodata {
						background-color: $danger;
					}
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
