<template>
	<div class="breadcrumb" v-if="breadcrumbs.length">
		<Breadcrumb>
			<BreadcrumbItem
				v-for="item in breadcrumbs"
				:key="item.name"
				:to="item.url"
			>
				{{ item.name }}
			</BreadcrumbItem>
		</Breadcrumb>
	</div>
</template>

<script>
import {Breadcrumb, BreadcrumbItem} from "element-ui";

export default {
	components: {Breadcrumb, BreadcrumbItem},
	props: {
		breadcrumbs: {type: Array, default: () => []}
	}
};
</script>

<style lang="scss" scoped>
.breadcrumb {
	.el-breadcrumb {
		font-size: 16px;

		&__item {
			::v-deep {
				.el-breadcrumb__inner {
					font-weight: 400;
					font-size: 13px;
					color: $white1;
				}

				.el-breadcrumb__separator {
					vertical-align: middle;
					font-weight: 400;
				}
			}
		}
	}
}
</style>
