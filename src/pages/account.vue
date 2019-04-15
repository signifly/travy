<template>
	<div class="account">
		<viewPage v-bind="{requests}" @save="save" />
	</div>
</template>

<script>
import viewPage from "@/pages/view/page.vue";

export default {
	components: {viewPage},
	data() {
		return {
			requests: {
				data: "account",
				definitions: "definitions/view/account"
			}
		};
	},
	methods: {
		save({data}) {
			this.$store.commit("user/data", {data});
		}
	}
};
</script>
