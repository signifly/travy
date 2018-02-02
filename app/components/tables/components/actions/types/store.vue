<template>
	<div class="store">
		<Button type="info" size="medium" :disabled="loading" plain>Cancel</Button>
		<Button type="info" size="medium" :loading="loading" @click="create">Create</Button>
	</div>
</template>

<script>
import {Button} from "element-ui";

export default {
	components: {Button},
	props: {
		payload: {type: Object, required: true},
		endpoints: {type: Object, required: true}
	},
	data() {
		return {
			loading: false
		}
	},
	methods: {
		async create() {
			this.loading = true;
			// this.$http.post(this.endpoints.store.url, this.payload);
			const {data} = await this.$http.post("https://sikaline.glitch.me/products", this.payload);
			this.$router.push(`products/${data.id}`);
		}
	}
};
</script>

<style lang="scss" scoped>
.store {

}
</style>
