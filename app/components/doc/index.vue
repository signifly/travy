<template>
	<div class="doc">
		<div class="group">
			<vFields />
		</div>
	</div>
</template>

<script>
import vFields from "./fields.vue";

export default {
	components: {vFields},
	mounted() {
		const hash = location.hash;
		location.hash = "";
		location.hash = hash;
	}
};
</script>

<style lang="scss" scoped>
.doc {
	margin: 0 auto;
	max-width: 75em;
}
</style>
