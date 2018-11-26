<template>
	<div class="top">
		<div class="info">
			<div class="title" v-text="title"/>
			<div class="total" v-if="meta" v-text="meta.total"/>

			<transition name="loading">
				<div class="loading" v-if="loading">
					<i class="el-icon-loading"/>
				</div>
			</transition>
		</div>

		<modifiers v-if="modifiers" v-bind="modifiers" @refresh="refresh"/>
	</div>
</template>

<script>
import modifiers from "@/components/modifiers";

export default {
	components: {modifiers},
	props: {
		modifiers: {type: Object, required: false},
		loading: {type: Boolean, required: true},
		title: {type: String, required: true},
		meta: {type: Object, required: false}
	},
	methods: {
		refresh() {
			this.$emit("refresh");
		}
	}
}
</script>

<style lang="scss" scoped>
.top {
	padding: 1.5em 1.5em;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.info {
		width: 100%;
		display: flex;
		align-items: center;

		.total {
			font-size: em(12);
			margin-left: 0.75em;
			color: $blue3;
		}

		.loading {
			margin-left: 1em;
			font-size: em(16);
			color: $blue5;

			&-enter-active, &-leave-active {
				transition: cubic(opacity, 0.1s);
			}
			&-enter, &-leave-to {
				opacity: 0;
			}
		}
	}
}
</style>
