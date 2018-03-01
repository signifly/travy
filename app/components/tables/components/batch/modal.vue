<template>
	<Dialog :title="title" :visible.sync="open" width="500px">
		<div class="modal">
			<field v-for="field in fields" v-bind="field" :errors="error.errors" :data="data" :key="field.type" @fieldA="fieldA" />
		</div>

		<div class="footer" slot="footer">
			<div class="actions">
				<Button size="medium" type="info" plain :disabled="loading" @click="close">Cancel</Button>
				<Button size="medium" type="primary" :loading="loading" @click="save">Apply</Button>
			</div>

			<div class="error" v-if="error.message">{{error.message}}</div>
			<div class="error-ids" v-if="idsError">{{idsError}}</div>
		</div>
	</Dialog>
</template>

<script>
import {forEach, get, set} from "lodash";
import {Dialog, Button} from "element-ui";
import field from "@/components/field.vue";

export default {
	components: {Dialog, Button, field},
	props: {
		active: {type: Boolean, required: true},
		error: {type: Object, required: true},
		fields: {type: Array, required: true},
		title: {type: String, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			loading: false,
			payload: this.data
		}
	},
	computed: {
		idsError: (t) => get(t.error, "errors.ids[0]"),

		open: {
			get() {
				return this.active;
			},
			set(bool) {
				this.$emit("update:active", bool);
			}
		}
	},
	methods: {
		fieldA({data}) {
			forEach(data, (val, key) => set(this.payload, key, val));
		},

		close() {
			this.open = false;
		},

		save() {
			this.loading = true;

			this.$emit("save", {
				data: this.payload,
				done: async ({error} = {}) => {
					this.loading = false;
					if (!error) this.close();
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ {
	.el-dialog__title {
		font-weight: 600;
	}
}

.footer {
	.error {
		margin-top: 1em;
		font-size: 0.875em;
		color: $danger;

		&-ids {
			margin-top: 0.5em;
			font-size: 0.875em;
			color: $danger;
		}
	}
}
</style>
