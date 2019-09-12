<template>
	<div class="modal">
		<vModalFields
			v-bind="{fields, error, loading, title, data}"
			:visible.sync="visible"
			@event="event"
			@submit="submit"
		/>
	</div>
</template>

<script>
import vModalFields from "@/components/modal-fields.vue";
import {mapPaths, download} from "@/modules/utils";
import toFormData from "object-to-formdata";

export default {
	components: {vModalFields},
	props: {
		download: {type: Boolean, required: false},
		endpoint: {type: Object, required: true},
		payload: {type: Object, required: true},
		title: {type: String, required: false},
		fields: {type: Array, required: true}
	},
	data() {
		return {
			data: this.payload.data,
			loading: false,
			error: {}
		};
	},
	computed: {
		upload() {
			return this.fields
				.map((x) => x.fieldType.id === "input-upload")
				.some((x) => x);
		},

		payloadC: (t) => ({
			...t.payload,
			data: mapPaths(t.data)
		}),

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
		event({actions}) {
			if (actions.update) {
				let {data} = actions.update;
				this.data = {...this.data, ...data};
			}
		},

		close() {
			this.$emit("close");
		},

		async submit() {
			try {
				this.loading = true;

				const {data, headers} = await this.$axios({
					data: this.upload ? toFormData(this.payloadC) : this.payloadC,
					method: this.endpoint.method,
					url: this.endpoint.url,
					responseType: this.download && "blob",
					customErr: true,
					onUploadProgress: (e) => {
						this.loading = Math.round((e.loaded / e.total) * 100);
					}
				});

				if (this.download) {
					download({
						url: URL.createObjectURL(data),
						name: headers["content-disposition"].split("filename=")[1]
					});

					this.$emit("submit", {});
				} else {
					this.$emit("submit", data);
				}
			} catch (err) {
				this.error = err;
				this.loading = false;
			}
		}
	}
};
</script>
