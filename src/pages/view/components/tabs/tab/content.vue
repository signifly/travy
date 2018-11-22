<template>
	<div class="tab">
		<div class="fields" v-if="tab.data">
			<field
				v-for="field in fields"
				v-bind="[field, {alt: {data: tab.data, options: tab.options, type: 'view-tab'}}]"
				:key="field.name"
				@fieldA="fieldA"
			/>
		</div>
	</div>
</template>

<script>
import {endpointUrl} from "@/modules/utils";
import field from "@/components/field";
import {forEach, set} from "lodash";

export default {
	components: {field},
	props: {
		endpoint: {type: Object, required: true},
		fields: {type: Array, required: true},
		title: {type: String, required: true},
		state: {type: Object, required: true},
		data: {type: Object, required: true},
		id: {type: String, required: true}
	},
	data() {
		return {
			tab: {
				data: null,
				options: null,
				payload: {}
			},

			loading: false,
			saving: false,
			error: false
		}
	},
	computed: {
		endpointUrl: (t) => endpointUrl({data: t.data, url: t.endpoint.url}),
		modifiers: (t) => t.$route.query.modifiers,

		actions: (t) => ({
			refresh: async ({done}) => {
				await t.getData();
				if (done) await done();
			},

			update: async ({data}) => {
				t.$emit("update:state", {...t.state, edit: true});
				forEach(data, (val, key) => set(t.tab.data, key, val));
				forEach(data, (val, key) => set(t.tab.payload, key, val));
			}
		})
	},
	methods: {
		fieldA({action, data, done}) {
			if (this.actions[action]) this.actions[action]({data, done});
		},

		async getData() {
			const {data: {data, options}} = await this.$axios.get(this.endpointUrl, {
				params: {...this.endpoint.params, modifier: this.modifiers}
			});

			this.tab.options = options;
			this.tab.data = data;
		},

		async save({done} = {}) {
			this.saving = true;

			try {
				const {data: {data, options}} = await this.$axios.put(this.endpointUrl, {
					modifier: this.modifiers,
					data: this.tab.payload
				}, {customErr: true});

				this.$emit("update:state", {});
				this.tab.options = options;
				this.tab.data = data;

				if (done) await done();
			} catch(err) {
				this.error = err;
			} finally {
				this.saving = false;
			}
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.tab {

}
</style>
