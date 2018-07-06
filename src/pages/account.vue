<template>
	<div class="account">
		<vView v-bind="{requests}" />
	</div>
</template>

<script>
import vView from "@/components/view/index.vue";

export default {
	components: {vView},
	data() {
		return {
			requests: {
				data: "account",
				definitions: "definitions/view/account"
			}
		}
	}
};
</script>
