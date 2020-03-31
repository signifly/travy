<template>
	<div class="fields" v-if="data">
		<field
			v-bind="{field, data, options, error}"
			v-for="field in fields"
			:key="field.attribute"
			@event="event"
			type="fields"
		/>
	</div>

	<loader v-else />
</template>

<script>
import {transProps, mergeData} from "@/modules/utils";
import field from "@/components/field";
import loader from "./loader";

export default {
	components: {field, loader},
	props: {
		parentData: {type: Object, required: false},
		definitions: {type: Object, required: true}
	},
	data: () => ({
		options: null,
		payload: {},
		error: null,
		data: null
	}),
	computed: {
		modifiers: (t) => t.$route.query.modifiers,
		fields: (t) => t.definitions.fields,

		endpoint() {
			return transProps({
				val: this.definitions.endpoint,
				data: this.parentData
			});
		}
	},
	methods: {
		async event({actions, done}) {
			if (actions.update) {
				this.$emit("edit", true);
				const {data} = actions.update;

				// merge payload
				this.payload = mergeData(this.payload, data);

				// merge data
				this.data = mergeData(this.data, data);
			}

			if (done) done();

			if (actions.refresh) {
				this.$emit("event", {actions});
			}
		},

		async getData() {
			const {data: res} = await this.$axios.get(this.endpoint.url, {
				params: {...this.endpoint.params, modifier: this.modifiers}
			});

			this.options = res.options;
			this.data = {...res.data, $parent: this.parentData};
		},

		async save() {
			const body = {modifier: this.modifiers, data: this.payload};

			try {
				await this.$axios.put(this.endpoint.url, body, {customErr: true});

				this.error = null;
				this.payload = {};

				return {actions: {refresh: true}};
			} catch (error) {
				this.error = error;
				throw error;
			}
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.fields {
	margin: 0.5em 1.5em 1.5em;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>
