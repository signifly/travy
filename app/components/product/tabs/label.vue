<template>
	<div class="label">
		{{label}}
		<div class="status" :class="status" v-if="status"></div>

		<transition name="el-fade-in">
			<div class="edit" v-if="edit">
				<i class="el-icon-edit"></i>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		label: {type: String, required: true},
		status: {type: String, required: false},
		edit: {type: Function, required: false}
	}
};
</script>

<style lang="scss" scoped>
.label {
	display: flex;
	align-items: center;

	.status {
		$s: 0.7em;
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
	}

	.edit {
		z-index: 1;
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
