<template>
	<div class="edit">
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
import vModalFields from "@/components/modal-fields.vue";

export default {
	components: {vModalFields},
	props: {
		item: {type: Object, required: true},
		modalTitle: {type: String, required: false},
		rootData: {type: Object, required: true},
		fields: {type: Array, required: true},
		fieldsData: {type: Object, required: true}
	},
	data() {
		return {
			error: {},
			payload: {},
			loading: false
		}
	},
	computed: {
		dataComb: (t) => ({...t.rootData, fieldsData: t.fieldsData}),

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
			
		}
	}
};
</script>
