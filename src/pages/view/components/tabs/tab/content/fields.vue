<template>
	<div class="tab">
		<div class="fields" v-if="state.data">
			<field
				v-for="field in fields"
				v-bind="[field, {alt: fieldAlt}]"
				:key="field.name"
				@event="event"
			/>
		</div>
	</div>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import field from "@/components/field";
import {get, set, merge} from "lodash";

export default {
	components: {field},
	props: {
		parentData: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		fields: {type: Array, required: true},
		title: {type: Object, required: true},
		state: {type: Object, required: true},
		type: {type: String, required: true},
		id: {type: String, required: true}
	},
	data() {
		return {
			payload: {}
		}
	},
	computed: {
		endpointUrl: (t) => rStringProps({data: t.parentData, val: t.endpoint.url}),
		modifiers: (t) => t.$route.query.modifiers,

		fieldAlt: (t) => ({
			errors: get(t.state.error, "errors"),
			options: t.state.options,
			data: t.state.data,
			type: "view-tab"
		})
	},
	methods: {
		async event({actions, done}) {
			if (actions.update) {
				let {data} = actions.update;

				// {"key1.key2": 1} ===> {key1: {key2: 1}}
				data = Object.entries(data).reduce((obj, [key, val]) => set(obj, key, val), {});
				// merge payload with data
				this.payload = merge({}, this.payload, data);
				// merge state data with data
				const stateData = merge({}, this.state.data, data);
				// update state
				this.updateState({data: stateData, edit: true});
			}

			if (actions.refresh) {
				const {data} = actions.refresh;
				if (data) await this.getData();
			}

			if (done) await done();
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
			try {
				const {data: {data, options}} = await this.$axios.put(this.endpointUrl, {
					modifier: this.modifiers,
					data: this.payload
				}, {customErr: true});

				this.updateState({data, options, edit: false, error: null});
				this.payload = {};

				if (done) await done();
			} catch(error) {
				this.updateState({error});
				throw error.message;
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
	.fields {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
