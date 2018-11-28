<template>
	<div class="notification">
		<a class="badge">
			<Badge is-dot>
				<div class="icon" v-html="require('@/assets/icons/bell.svg')"/>
			</Badge>
		</a>
	</div>
</template>

<script>
import {Badge} from "element-ui";

export default {
	components: {Badge}
};
</script>

<style lang="scss" scoped>
.notification {
	position: relative;

	.badge {
		display: inline-flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		width: 60px;

		.icon {
			/deep/ svg {
				$s: 1.7em;
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
				right: 1em;
				top: 0.4em;
			}
		}
	}
}
</style>
