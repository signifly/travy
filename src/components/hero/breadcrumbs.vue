<template>
	<div class="breadcrumb" v-if="viewId">
		<Breadcrumb>
			<BreadcrumbItem :to="`/i/${indexId}`">{{ home }}</BreadcrumbItem>
			<BreadcrumbItem>#{{ viewId }}</BreadcrumbItem>
		</Breadcrumb>
	</div>
</template>

<script>
import {Breadcrumb, BreadcrumbItem} from "element-ui";

export default {
	components: {Breadcrumb, BreadcrumbItem},
	computed: {
		indexId: (t) => t.$route.params.indexId,
		viewId: (t) => t.$route.params.viewId,
		home() {
			return this.indexId
				.split("-")
				.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
				.join(" ");
		}
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
