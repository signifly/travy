<template>
	<vModalFields v-bind="{fields, error, title, loading}" :data="payload" :visible.sync="visible" @submit="submit" @fieldA="fieldA"/>
</template>

<script>
import {forEach, get, set} from "lodash";
import vModalFields from "@/components/modal-fields.vue";

export default {
	components: {vModalFields},
	props: {
		endpoints: {type: Object, required: true},
		active: {type: Boolean, required: true},
		fields: {type: Array, required: true},
		type: {type: String, required: true},
		title: {type: String, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			error: {},
			loading: false,
			payload: this.data
		}
	},
	computed: {
		visible: {
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

		submit() {
			if (this[this.type]) this[this.type]();
		},

		async store() {
			const epts = this.endpoints;

			try {
				this.loading = true;
				const {data} = await this.$http.post(epts.store.url, {data: this.payload}, {custom: true});
				this.$router.push(epts.show.url.replace("{id}", data.data.id));
			} catch ({response}) {
				this.error = get(response, "data", {});
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>
