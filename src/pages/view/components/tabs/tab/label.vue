<template>
	<div class="label">
		{{ title.text }}

		<transition name="status">
			<Tooltip content="Edited" placement="top" v-if="edit">
				<div class="status primary" />
			</Tooltip>
		</transition>

		<transition name="status">
			<Tooltip content="Outdated" placement="top" v-if="outdated">
				<div class="status warning" />
			</Tooltip>
		</transition>

		<transition name="status">
			<Tooltip content="Error" placement="top" v-if="error">
				<div class="status danger" />
			</Tooltip>
		</transition>
	</div>
</template>

<script>
import {Tooltip} from "element-ui";

export default {
	components: {Tooltip},
	props: {
		id: {type: String, required: true},
		title: {type: Object, required: true},
		state: {type: Object, required: true}
	},
	computed: {
		edit: (t) => t.state.edit,
		error: (t) => t.state.error,
		outdated: (t) =>
			Object.values(t.state.options || {}).some((obj) => obj.outdated)
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
