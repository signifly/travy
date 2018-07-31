<template>
	<div class="search">
		<transition name="input">
			<GmapAutocomplete
				v-if="loaded"
				v-bind="options"
				@place_changed="search"
			/>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		loaded: {type: Boolean, required: true}
	},
	data() {
		return {
			options: {
				class: "input",
				placeholder: "Find a store",
				selectFirstOnEnter: true
			}
		}
	},
	methods: {
		search(place) {
			this.$emit("search", place);
		}
	}
};
</script>

<style lang="scss" scoped>
$h: 1.5em;

.search {
	position: absolute;
	bottom: 1.5em;
	left: 50%;
	transform: translate(-50%);

	.input {
		outline: none;
		box-shadow: 0 4px 6px 0 rgba(94,109,130,0.2);
		width: 20em;
		height: $h;
		padding: 1em 1.5em;
		border: 0px;
		font-size: 0.9em;

		$t: 0.2s;

		&-enter-active, &-leave-active {
			transition: cubic(opacity, $t), cubic(transform, $t);
			transition-delay: 1s;
		}
		&-enter, &-leave-to {
			opacity: 0;
			transform: translateY(10px) scale(0.98);
		}
	}
}
</style>
