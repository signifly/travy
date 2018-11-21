<template>
	<div class="label">
		{{title}}

		<transition name="status">
			<div class="status primary" v-if="editing"/>
		</transition>

		<transition name="status">
			<!-- <div class="status warning" v-if="outdated"/> -->
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		id: {type: String, required: true},
		title: {type: String, required: true},
		tabsState: {type: Object, required: true}
		// options: {type: Object, required: false}
	},
	computed: {
		editing: (t) => Object.keys(t.tabsState[t.id]).length
		// outdated: (t) => t.tab.sections.some(x => x.fields.some(x => get(t.options, [x.name, "outdated"])))
	}
};
</script>

<style lang="scss" scoped>
.label {
	display: flex;
	align-items: center;

	.status {
		$s: 8px;
		width: $s;
		height: $s;
		border-radius: 50%;
		margin-left: 0.5em;

		&.primary {
			background-color: $primary;
		}
		&.danger {
			background-color: $danger;
		}
		&.warning {
			background-color: $warning;
		}

		&-enter-active, &-leave-active {
			$s: 0.4s;
			transition: cubic(width, $s), cubic(height, $s), cubic(margin, $s), cubic(opacity, $s);
		}

		&-enter, &-leave-to {
			width: 0;
			height: 0;
			margin: 0;
			opacity: 0;
		}
	}
}
</style>
