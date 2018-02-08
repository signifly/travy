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
			try {
				this.loading = true;
				const {data} = await this.$http.post(this.endpoints.store.url, this.payload);
				this.$router.push(`products/${data.id}`);
			} catch (err) {
				console.log(err);
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.store {

}
</style>
