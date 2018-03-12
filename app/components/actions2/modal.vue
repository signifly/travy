<template>
	<div class="modal">
		<vModalFields
			v-bind="{fields, error, loading}"
			:data="dataComb"
			:title="modalTitle"
			:visible.sync="visible"
			@fieldA="fieldA"
			@submit="submit"
		/>
	</div>
</template>

<script>
import {get} from "lodash";
import vModalFields from "@/components/modal-fields.vue";
import {endpointUrl} from "@/modules/utils";

export default {
	components: {vModalFields},
	props: {
		modalTitle: {type: String, required: false},
		rootData: {type: Object, required: false},
		endpoint: {type: Object, required: true},
		data: {type: Object, required: true},
		fields: {type: Array, required: true}
	},
	data() {
		return {
			error: {},
			payload: {},
			loading: false
		}
	},
	computed: {
		dataComb: (t) => ({...t.rootData, fieldsData: t.data}),
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

		async submit() {
			try {
				this.loading = true;

				const {data} = await this.$http[this.endpoint.method](
					this.endpointUrl,
					{data: this.payload},
					{custom: true}
				);

				this.$emit("submit", {data});

			} catch ({response}) {
				this.error = get(response, "data", {});
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>
