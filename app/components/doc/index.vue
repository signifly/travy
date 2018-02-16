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
	components: {vFields}
};
</script>

<style lang="scss" scoped>
.doc {
	margin: 2em auto 8em;
	padding: 0 2em;
	max-width: 70em;
}
</style>
