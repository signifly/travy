<template>
	<div class="tab">
		<div class="fields" v-if="state.data">
			<field
				v-for="field in fields"
				v-bind="[field, {alt: fieldAlt}]"
				:key="field.name"
				@fieldA="fieldA"
			/>
		</div>
	</div>
</template>

<script>
import {endpointUrl} from "@/modules/utils";
import field from "@/components/field";
import {forEach, get, set} from "lodash";

export default {
	components: {field},
	props: {
		parentData: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		fields: {type: Array, required: true},
		title: {type: String, required: true},
		state: {type: Object, required: true},
		id: {type: String, required: true}
	},
	data() {
		return {
			payload: {},
			loading: false,
			saving: false
		}
	},
	computed: {
		endpointUrl: (t) => endpointUrl({data: t.parentData, url: t.endpoint.url}),
		modifiers: (t) => t.$route.query.modifiers,

		fieldAlt: (t) => ({
			errors: get(t.state.error, "errors"),
			options: t.state.options,
			data: t.state.data,
			type: "view-tab"
		}),

		actions: (t) => ({
			refresh: async ({done}) => {
				await t.getData();
				if (done) await done();
			},

			update: async ({data}) => {
				t.$emit("update:state", {...t.state, edit: true});
				forEach(data, (val, key) => set(t.state.data, key, val));
				forEach(data, (val, key) => set(t.payload, key, val));
			}
		})
	},
	methods: {
		fieldA({action, data, done}) {
			if (this.actions[action]) this.actions[action]({data, done});
		},

		updateState(obj) {
			this.$emit("update:state", {...this.state, ...obj});
		},

		async getData() {
			const {data: {data, options}} = await this.$axios.get(this.endpointUrl, {
				params: {...this.endpoint.params, modifier: this.modifiers}
			});

			this.updateState({data, options});
		},

		async save({done} = {}) {
			this.saving = true;

			try {
				const {data: {data, options}} = await this.$axios.put(this.endpointUrl, {
					modifier: this.modifiers,
					data: this.payload
				}, {customErr: true});

				this.updateState({data, options, edit: false, error: null});

				if (done) await done();
			} catch(error) {
				this.updateState({error});
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
