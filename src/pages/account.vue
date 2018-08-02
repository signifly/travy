<template>
	<div class="account">
		<vView v-bind="{requests}" @save="save" />
	</div>
</template>

<script>
import vView from "@/components/view/index.vue";

export default {
	components: {vView},
	data() {
		return {
			requests: {
				data: "admin/account",
				definitions: "admin/definitions/view/account"
			}
		}
	},
	methods: {
		save({data}) {
			this.$store.commit("user/data", {data});
		}
	}
};
</script>
