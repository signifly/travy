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
		id: {type: String, required: true},
		name: {type: String, required: true},
		edit: {type: Boolean, required: false},
		active: {type: Boolean, required: true}
	},
	computed: {
		query: (t) => t.$route.query,
		edited: (t) => t.edit && t.active,
		disabled: (t) => t.edit && !t.active
	},
	methods: {
		set() {
			if (!this.edit) {
				this.$router
					.replace({
						path: this.$route.path,
						query: {
							modifiers: this.query.modifiers,
							tab: this.id
						}
					})
					.catch(() => {});
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
