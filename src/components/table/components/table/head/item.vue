<template>
	<th class="item" :width="width">
		<div class="wrap">
			{{ name }}

			<a class="sort" v-if="sortBy" @click="sort">
				<i class="el-icon-caret-top" :class="{active: query.sort === sortBy}" />
				<i
					class="el-icon-caret-bottom"
					:class="{active: query.sort === `-${sortBy}`}"
				/>
			</a>
		</div>
	</th>
</template>

<script>
import state from "../../../state";

export default {
	props: {
		name: {type: String, required: true},
		width: {type: Number, required: false},
		sortBy: {type: String, required: false},
		onClick: {type: String, required: false},
		fieldType: {type: Object, required: true}
	},
	computed: {
		query: () => state.query,
		nextSort() {
			const states = [undefined, this.sortBy, `-${this.sortBy}`];
			const index = states.findIndex((x) => x === this.query.sort);
			return states[index + 1] || states[0];
		}
	},
	methods: {
		sort() {
			state.mergeQuery({
				type: "replace",
				query: {
					sort: this.nextSort,
					page: undefined
				}
			});

			this.$emit("getData");
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	padding: 1em 10px;
	color: #5e6d82;

	.wrap {
		display: flex;
		align-items: center;

		.sort {
			position: relative;
			flex-direction: column;
			margin-left: 0.5em;
			font-size: 14px;
			display: flex;
			color: #c0c4cc;

			i {
				position: absolute;
				$p: -4px;

				&:first-child {
					bottom: $p;
				}

				&:last-child {
					top: $p;
				}

				&.active {
					color: #409eff;
				}
			}
		}
	}
}
</style>
