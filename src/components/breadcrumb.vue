<template>
	<div class="breadcrumb">
		<Breadcrumb>
			<BreadcrumbItem :to="{name: 'index'}">Home</BreadcrumbItem>
			<BreadcrumbItem v-for="item in items" :key="item.to" :to="item.to">{{item.title}}</BreadcrumbItem>
		</Breadcrumb>
	</div>
</template>

<script>
import {Breadcrumb, BreadcrumbItem} from "element-ui";

export default {
	components: {Breadcrumb, BreadcrumbItem},
	props: {
		items: {type: Array, required: false} // {title, to}
	}
};
</script>

<style lang="scss" scoped>
.breadcrumb {
	margin-bottom: 1em;

	.el-breadcrumb {
		font-size: 16px;

		&__item {
			::v-deep {
				.el-breadcrumb__inner {
					font-size: em(13);
					font-weight: 400;
					color: $blue4;
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
