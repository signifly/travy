<template>
	<div class="breadcrumb">
		<Breadcrumb>
			<BreadcrumbItem :to="{name: 'index'}">Startside</BreadcrumbItem>
			<BreadcrumbItem v-for="r in matched" v-if="r.name !== 'index'" :key="r.path" :to="r.path">
				{{r.name}}
			</BreadcrumbItem>
		</Breadcrumb>
	</div>
</template>

<script>
import {Breadcrumb, BreadcrumbItem} from "element-ui";

export default {
	components: {Breadcrumb, BreadcrumbItem},
	computed: {
		matched: (t) => t.$route.matched
	}
};
</script>

<style lang="scss" scoped>
.breadcrumb {
	margin-bottom: 2em;

	.el-breadcrumb {
		&__item {
			/deep/ .el-breadcrumb__inner {
				font-weight: 400;
			}
		}
	}
}
</style>
