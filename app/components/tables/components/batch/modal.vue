<template>
	<vModalFields v-bind="{title, fields, error, loading}" :data="payload" :visible.sync="open" @submit="submit" @fieldA="fieldA">
		<div class="footer" slot="footer">
			<div class="error-ids" v-if="idsError">{{idsError}}</div>
		</div>
	</vModalFields>
</template>

<script>
import {forEach, get, set} from "lodash";
import vModalFields from "@/components/modal-fields.vue";

export default {
	components: {vModalFields},
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

		submit() {
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
.footer {
	.error-ids {
		margin-top: 0.5em;
		font-size: 0.875em;
		color: $danger;
	}
}
</style>
