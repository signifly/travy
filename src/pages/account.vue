<template>
	<div class="account" v-if="definitions">
		<page
			v-bind="definitions"
			@refresh="getData"
			:key="refreshKey"
			url="/account"
		/>
	</div>
</template>

<script>
import page from "./view/page";

export default {
	components: {page},
	data: () => ({
		definitions: null,
		refreshKey: 0
	}),
	methods: {
		async getData() {
			try {
				const {data} = await this.$axios.get("/definitions/view/account");
				this.definitions = data;
				this.refreshKey++;
			} catch ({status}) {
				this.$router.replace({name: "error", params: {status}});
			}
		}
	},
	created() {
		this.getData();
	}
};
</script>
