<template>
	<div class="store">
		<div class="actions">
			<Button type="info" size="medium" :disabled="loading" plain>Cancel</Button>
			<Button type="info" size="medium" :loading="loading" @click="create">Create</Button>
		</div>

		<div class="error" v-if="error.message">{{error.message}}</div>
	</div>
</template>

<script>
import {Button} from "element-ui";

export default {
	components: {Button},
	props: {
		payload: {type: Object, required: true},
		endpoints: {type: Object, required: true},
		error: {type: Object, required: true}
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
				const {data} = await this.$http.post(this.endpoints.store.url, this.payload, {custom: true});
				this.$router.push(`products/${data.id}`);
			} catch ({response}) {
				this.$emit("update:error", response.data);
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.store {
	.error {
		margin-top: 1em;
		font-size: 0.875em;
		color: $danger;
	}
}
</style>
