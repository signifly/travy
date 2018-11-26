<template>
	<div class="modal">
		<vModalFields
			v-bind="{fields, error, loading, title, data}"
			:visible.sync="visible"
			@fieldA="fieldA"
			@submit="submit"
		/>
	</div>
</template>

<script>
import toFormData from "object-to-formdata";
import {endpointUrl} from "@/modules/utils";
import vModalFields from "@/components/modal-fields.vue";

export default {
	components: {vModalFields},
	props: {
		title: {type: String, required: false},
		endpoint: {type: Object, required: true},
		onSubmit: {type: String, required: false},
		payload: {type: Object, required: true},
		fields: {type: Array, required: true}
	},
	data() {
		return {
			data: this.payload.data,
			loading: false,
			error: {}
		}
	},
	computed: {
		upload: (t) => t.fields.map(x => x.fieldType.id === "input-upload").some(x => x),
		payloadC: (t) => ({...t.payload, data: t.data}),

		visible: {
			get() {
				return true;
			},
			set() {
				this.close();
			}
		}
	},
	methods: {
		fieldA({data}) {
			this.data = {...this.data, ...data};
		},

		close() {
			this.$emit("close");
		},

		async submit() {
			try {
				this.loading = true;

				const {data: {data}} = await this.$axios({
					data: this.upload ? toFormData(this.payloadC) : this.payloadC,
					method: this.endpoint.method,
					url: this.endpoint.url,
					customErr: true,
					onUploadProgress: (e) => {
						this.loading = Math.round(e.loaded / e.total * 100);
					}
				});

				this.submitAfter({data});
			} catch(err) {
				this.error = err;
				this.loading = false;
			}
		},

		submitAfter({data}) {
			if (this.onSubmit) {
				this.$router.push(this.onSubmit);
			} else {
				this.$emit("fieldA", {
					action: "refresh",
					done: async () => this.close()
				});
			}
		}
	}
};
</script>
