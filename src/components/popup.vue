<template>
	<transition :name="transition" appear>
		<div class="popup" :class="[`position-${position}`, `type-${type}`]">
			<slot />
		</div>
	</transition>
</template>

<script>
export default {
	name: "popup-comp",
	props: {
		position: {type: String, required: false, default: "bottom-right"},
		type: {type: String, required: false}
	},
	computed: {
		transition() {
			if (this.position.includes("top")) return "trans-fadeUp";
			if (this.position.includes("bottom")) return "trans-fadeDown";
			return "";
		}
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

	&.position {
		&-top {
			&-right {
				bottom: calc(100% + 1em);
				right: 0;
			}
		}
		&-bottom {
			&-right {
				top: calc(100% + 0.5em);
				right: 0;
			}
		}
	}

	&.type {
		&-action {
			width: 200px;
			padding: 1em;
		}

		&-list {
			padding: 0.4em 0;

			::v-deep .item {
				display: block;
				font-size: 0.8em;
				white-space: nowrap;
				user-select: none;
				padding: 0.75em 1em;

				&:hover {
					background-color: $--dropdown-menuItem-hover-fill;
					color: $--dropdown-menuItem-hover-color;
				}
			}
		}
	}
}
</style>
