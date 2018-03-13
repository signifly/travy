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
import {endpointUrl} from "@/modules/utils";
import vModalFields from "@/components/modal-fields.vue";

export default {
	components: {vModalFields},
	props: {
		title: {type: String, required: false},
		rootData: {type: Object, required: false},
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
		dataComb: (t) => ({...t.rootData, ...t.data}),
		endpointUrl: (t) => endpointUrl({data: t.dataComb, url: t.endpoint.url}),

		visible: {
			get() {
				return true;
			},
			set() {
				this.$emit("close");
			}
		}
	},
	methods: {
		fieldA({data}) {
			this.payload = {...this.payload, ...data};
		},

		submitAfter({data} = {}) {
			if (this.onSubmit) {
				const url = endpointUrl({data: data.data || this.dataComb, url: this.onSubmit});
				this.$router.push(`/${url}`);
			} else {
				this.$emit("submit");
			}
		},

		async submit() {
			try {
				this.loading = true;

				const {data} = await this.$http[this.endpoint.method](
					this.endpointUrl,
					{data: this.payload},
					{custom: true}
				);

				this.submitAfter({data});
			} catch ({response}) {
				this.error = get(response, "data", {});
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>
