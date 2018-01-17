<template>
	<div class="breadcrumb">
		<Breadcrumb>
			<BreadcrumbItem :to="{name: 'index'}">home</BreadcrumbItem>

			<template v-if="!items">
				<BreadcrumbItem v-for="r in matched" v-if="r.name !== 'index'" :key="r.path" :to="r.path">
					{{r.name}}
				</BreadcrumbItem>
			</template>

			<template v-else>
				<BreadcrumbItem v-for="item in items" :key="item.title" :to="item.to">
					{{item.title}}
				</BreadcrumbItem>
			</template>
		</Breadcrumb>
	</div>
</template>

<script>
import {Breadcrumb, BreadcrumbItem} from "element-ui";

export default {
	components: {Breadcrumb, BreadcrumbItem},
	props: {
		items: {type: Array, required: false}
	},
	computed: {
		matched: (t) => t.$route.matched
	}
};
</script>

<style lang="scss" scoped>
.breadcrumb {
	margin-bottom: 2em;

	.el-breadcrumb {
		font-size: 16px;

		&__item {
			/deep/ {
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
