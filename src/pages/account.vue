<template>
	<div class="account">
		<pageView v-bind="{requests}" @save="save" />
	</div>
</template>

<script>
import pageView from "@/pages/view/page";

export default {
	components: {pageView},
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
	},
	created() {
		this.$store.dispatch("base/meta", {
			title: this.$translate({
				en: "Account",
				da: "Profil"
			})
		});
	}
};
</script>
