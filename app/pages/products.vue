<template>
	<div class="products">
		<mainTable v-bind="{title}"></mainTable>
	</div>
</template>

<script>
import mainTable from "../components/table/main.vue";

export default {
	components: {mainTable},
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
