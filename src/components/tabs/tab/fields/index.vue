<template>
	<div class="fields">
		<field
			v-for="field in fields"
			v-bind="[field, {alt}]"
			:key="field.name"
			@event="event"
		/>
	</div>
</template>

<script>
import {rStringProps, mapPaths, mergeData} from "@/modules/utils";
import field from "@/components/field";

export default {
	components: {field},
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
			return rStringProps({
				val: this.definitions.endpoint,
				data: this.parentData
			});
		},

		alt: (t) => ({
			errors: t.error && t.error.errors,
			options: t.options,
			type: "fields",
			data: t.data
		})
	},
	methods: {
		async event({actions, done}) {
			if (actions.update) {
				this.$emit("edit", true);
				let {data} = actions.update;

				data = mapPaths(data);

				// merge payload
				this.payload = mergeData(this.payload, data);

				// merge data
				this.data = mergeData(this.data, data);
			}

			if (done) await done();

			if (actions.refresh) {
				this.$emit("event", {actions});
			}
		},

		async getData() {
			const {
				data: {data, options}
			} = await this.$axios.get(this.endpoint.url, {
				params: {...this.endpoint.params, modifier: this.modifiers}
			});

			this.options = options;
			this.data = data;
		},

		async save() {
			const body = {modifer: this.modifiers, data: this.payload};

			console.log("save");

			try {
				await this.$axios.put(this.endpoint.url, body, {customErr: true});

				this.error = null;
				this.payload = {};

				return {actions: {refresh: {data: true}}};
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
	padding: 0 1.5em;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>
