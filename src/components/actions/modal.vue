<template>
	<div class="modal">
		<vModalFields
			v-bind="{fields, error, loading, title}"
			:visible.sync="visible"
			:data="payload"
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
		dataComb: {type: Object, required: true},
		fields: {type: Array, required: true}
	},
	data() {
		return {
			error: {},
			payload: this.dataComb,
			loading: false
		}
	},
	computed: {
		vUpload: (t) => t.fields.map(x => x.fieldType.id === "vUpload").some(x => x),

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
			this.payload = {...this.payload, ...data};
		},

		close() {
			this.$emit("close");
		},

		async submit() {
			try {
				this.loading = true;

				const {data} = await this.$axios({
					data: this.vUpload ? toFormData(this.payload) : this.payload,
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
				const url = endpointUrl({data: data.data || this.dataComb, url: this.onSubmit});
				this.$router.push(url);
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
