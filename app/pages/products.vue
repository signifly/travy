<template>
	<div class="products">
		<breadcrumb />
		<mainTable v-bind="{title}"></mainTable>
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import mainTable from "@/components/table/main.vue";


export default {
	components: {breadcrumb, mainTable},
	data() {
		return {
			title: "Products"
		}
	}
};
</script>

<style lang="scss" scoped>
.products {

}
</style>
