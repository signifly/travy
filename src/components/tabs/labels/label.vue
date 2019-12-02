<template>
	<a class="label" :class="{active, disabled}" @click="set">
		{{ name }}

		<transition name="status">
			<Tooltip content="Edited" placement="top" v-if="edited">
				<div class="status primary" />
			</Tooltip>
		</transition>
	</a>
</template>

<script>
import {Tooltip} from "element-ui";

export default {
	components: {Tooltip},
	props: {
		active: {type: Boolean, required: true},
		edit: {type: Boolean, required: false},
		state: {type: Object, required: true},
		name: {type: String, required: true},
		id: {type: String, required: true}
	},
	computed: {
		disabled: (t) => t.edit && !t.active,
		edited: (t) => t.edit && t.active,
		query: (t) => t.state.query
	},
	methods: {
		set() {
			if (!this.edit && this.id !== this.query.tab) {
				this.state.set({
					modifiers: this.query.modifiers,
					seq: this.query.seq,
					tab: this.id
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.label {
	display: inline-flex;
	align-items: center;
	user-select: none;
	margin-left: 24px;
	height: 100%;

	&.active {
		border-bottom: 2px solid #24b0d5;
	}

	&.disabled {
		color: grey;
		pointer-events: none;
	}

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

		&-enter-active,
		&-leave-active {
			$s: 0.4s;
			transition: cubic(width, $s), cubic(height, $s), cubic(margin, $s),
				cubic(opacity, $s);
		}

		&-enter,
		&-leave-to {
			width: 0;
			height: 0;
			margin: 0;
			opacity: 0;
		}
	}
}
</style>
