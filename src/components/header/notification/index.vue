<template>
	<div class="notification">
		<a class="badge" @mousedown="toggle">
			<Badge is-dot>
				<div class="icon" v-html="require('@/assets/icons/bell.svg')"/>
			</Badge>
		</a>

		<list v-if="active"/>
	</div>
</template>

<script>
import {Badge} from "element-ui";
import list from "./list";

export default {
	components: {Badge, list},
	data() {
		return {
			active: false
		}
	},
	methods: {
		toggle() {
			this.active = !this.active;
		}
	}
};
</script>

<style lang="scss" scoped>
.notification {
	position: relative;
	outline: none;
	color: $black1;

	.badge {
		display: inline-flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		width: 60px;
		margin-top: 4px;

		.icon {
			display: inline-flex;

			/deep/ svg {
				$s: 1.5em;
				width: $s;
				height: $s;
				path {
					fill: $white1;
				}
			}
		}

		.el-badge {
			/deep/ .is-dot {
				border: 0px;
				right: 0.9em;
				top: 0.4em;
			}
		}
	}
}
</style>
