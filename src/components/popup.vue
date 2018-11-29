<template>
	<transition name="trans-fadeDown" appear>
		<div class="popup" :class="[position.split('-'), {list}]">
			<slot/>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		position: {type: String, required: false, default: "bottom-right"},
		list: {type: Boolean, required: false}
	}
};
</script>

<style lang="scss" scoped>
.popup {
	position: absolute;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	background-color: $white1;
	border-radius: 4px;
	z-index: 2;
	width: 200px;
	padding: 1em;

	&.top {
		bottom: calc(100% + 1em);

		&.right {
			right: 0;
		}
	}

	&.bottom {
		top: calc(100% + 1em);

		&.right {
			right: 0;
		}
	}

	&.list {
		padding: 0;
		width: auto;

		/deep/ .item {
			display: block;
			font-size: 0.8em;
			white-space: nowrap;
			user-select: none;
			padding: 1em;

			&:hover {
				background-color: $--dropdown-menuItem-hover-fill;
				color: $--dropdown-menuItem-hover-color;
			}
		}
	}
}
</style>
