<template>
	<vPopup v-bind="{position}">
		<div class="delete">
			<div class="text">{{text}}</div>
			<div class="buttons">
				<Button size="mini" :disabled="loading" @click="close">Cancel</Button>
				<Button size="mini" type="primary" :loading="loading" @click="submit">Submit</Button>
			</div>
		</div>
	</vPopup>
</template>

<script>
import {Button} from "element-ui";
import vPopup from "@/components/popup.vue";
import {endpointUrl} from "@/modules/utils";

export default {
	components: {Button, vPopup},
	props: {
		position: {type: String, required: false, default: "bottom-right"},
		text: {type: String, required: false, default: "Are you sure?"},
		endpoint: {type: Object, required: true},
		rootData: {type: Object, required: false},
		data: {type: Object, required: false}
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		parentId: (t) => t.$route.meta.id,
		endpointUrl: (t) => endpointUrl({data: t.rootData, url: t.endpoint.url})
	},
	methods: {
		close() {
			this.$emit("close");
		},
		async submit() {
			try {
				this.loading = true;
				await this.$http[this.endpoint.method](this.endpointUrl, {data: this.data});
				this.$router.push(`/${this.parentId}`);
			} catch (e) {} finally {
				this.loading = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.delete {
	.text {
		word-break: break-word;
		text-align: left;
		margin-bottom: 1.25em;
		font-size: 13px;
	}
	.buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
}
</style>
