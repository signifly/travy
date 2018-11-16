<template>
	<div class="label">
		{{label}}

		<transition name="status">
			<div class="status" :class="{warning: outdated}" v-if="outdated"/>
		</transition>

		<transition name="status">
			<div class="status" :class="{danger: nodata}" v-if="nodata" />
		</transition>

		<transition name="el-fade-in">
			<div class="edit" v-if="edited">
				<i class="el-icon-edit"></i>
			</div>
		</transition>
	</div>
</template>

<script>
import {get} from "lodash";

export default {
	props: {
		tab: {type: Object, required: true},
		edits: {type: Object, required: false},
		dataU: {type: Number, required: true},
		nodatas: {type: Object, required: true},
		options: {type: Object, required: false}
	},
	computed: {
		id: (t) => t.tab.id,
		label: (t) => t.tab.label,
		nodata: (t) => t.nodatas[t.id],
		edited: (t) => t.edits.tabs.has(t.id),
		outdated: (t) => t.tab.sections.some(x => x.fields.some(x => get(t.options, [x.name, "outdated"])))
	}
};
</script>

<style lang="scss" scoped>
.label {
	display: flex;
	align-items: center;

	.status {
		$s: 10px;
		width: $s;
		height: $s;
		border-radius: 50%;
		margin-left: 0.5em;

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

	.edit {
		z-index: 1;
		pointer-events: none;
		background-color: $white1;
		border: 1px solid $blue2;
		color: $blue1;
		position: absolute;
		border-radius: 50%;
		font-size: 0.9em;
		display: flex;
		align-items: center;
		justify-content: center;

		$s: 1.5em;
		width: $s;
		height: $s;
		top: -$s / 2;
		right: -$s / 2;
	}
}
</style>
