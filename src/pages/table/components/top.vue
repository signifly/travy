<template>
	<div class="top" title="">
		<div class="info">
			<component :is="title.url ? 'router-link' : 'div'" class="title" v-text="title.text" :to="title.url"/>
			<div class="total" v-if="meta" v-text="meta.total"/>

			<transition name="loading">
				<div class="loading" v-if="loading">
					<i class="el-icon-loading"/>
				</div>
			</transition>
		</div>

		<modifiers v-if="modifiers" v-bind="[modifiers, {query}]" @update="updateModifiers"/>
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
		title: {type: Object, required: true},
		meta: {type: Object, required: false}
	},
	computed: {
		query: () => state.query
	},
	methods: {
		updateModifiers({modifiers}) {
			state.setQuery({type: "replace", query: {
				...this.query,
				modifiers
			}});

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

		a.title {
			text-decoration: none;
			color: $black1;

			&:hover {
				color: $blue5;
			}
		}

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
