<template>
	<div class="label">
		{{label}}
		<transition name="status">
			<div class="status" :class="{danger: nodata}" v-if="nodata"></div>
		</transition>

		<transition name="el-fade-in">
			<div class="edit" v-if="edits.tabs.has(id)">
				<i class="el-icon-edit"></i>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		id: {type: String, required: true},
		label: {type: String, required: true},
		status: {type: String, required: false},
		edits: {type: Object, required: false},
		refs: {type: Object, required: true}
	},
	computed: {
		nodata() {
			const ref = this.refs[this.id];
			return ref.$refs.section.some(x => x.nodata);
		}
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
