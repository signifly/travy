<template>
	<div class="modal">
		<vModalFields
			v-bind="{fields, error, loading, title}"
			:data="dataComb"
			:visible.sync="visible"
			@fieldA="fieldA"
			@submit="submit"
		/>
	</div>
</template>

<script>
import {get} from "lodash";
import toFormData from "object-to-formdata";
import {endpointUrl} from "@/modules/utils";
import vModalFields from "@/components/modal-fields.vue";

export default {
	components: {vModalFields},
	props: {
		alt: {type: Object, default: () => ({})},
		title: {type: String, required: false},
		endpoint: {type: Object, required: true},
		onSubmit: {type: String, required: false},
		data: {type: Object, required: true},
		fields: {type: Array, required: true}
	},
	data() {
		return {
			error: {},
			payload: this.data,
			loading: false
		}
	},
	computed: {
		dataComb: (t) => ({...t.alt.data, ...t.data}),
		endpointUrl: (t) => endpointUrl({data: t.dataComb, url: t.endpoint.url}),
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

				const {data} = await this.$http({
					data: this.vUpload ? toFormData(this.payload) : this.payload,
					method: this.endpoint.method,
					url: this.endpointUrl,
					custom: true,
					onUploadProgress: (e) => {
						this.loading = Math.round(e.loaded / e.total * 100);
					}
				});

				this.submitAfter({data});
			} catch (err) {
				console.log(err);
				this.loading = false;
				console.log(err.response);
				this.error = get(err, "response.data", {});
			}
		},

		submitAfter({data}) {
			if (this.onSubmit) {
				const url = endpointUrl({data: data || this.dataComb, url: this.onSubmit});
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
