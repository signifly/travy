<template>
	<div class="top">
		<div class="info">
			<div class="total" v-if="meta" v-text="meta.total" />

			<transition name="loading">
				<div class="loading" v-if="loading">
					<i class="el-icon-loading" />
				</div>
			</transition>
		</div>

		<modifiers
			v-if="modifiers"
			v-bind="[modifiers, {query}]"
			@update="updateModifiers"
		/>
	</div>
</template>

<script>
import modifiers from "@/components/modifiers";
import state from "../state";

export default {
	components: {modifiers},
	props: {
		modifiers: {type: Object, required: false},
		loading: {type: Boolean, required: true},
		meta: {type: Object, required: false}
	},
	computed: {
		query: () => state.query
	},
	methods: {
		updateModifiers({modifiers}) {
			state.setQuery({
				type: "replace",
				query: {
					...this.query,
					modifiers
				}
			});

			this.$emit("reset");
		}
	}
};
</script>

<style lang="scss" scoped>
.top {
	padding: 0.5em 1.5em;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.info {
		width: 100%;
		display: flex;
		align-items: center;

		.total {
			font-size: em(12);
			color: $blue3;
		}

		.loading {
			margin-left: 1em;
			font-size: em(16);
			color: $blue5;

			&-enter-active,
			&-leave-active {
				transition: cubic(opacity, 0.1s);
			}
			&-enter,
			&-leave-to {
				opacity: 0;
			}
		}
	}
}
</style>
