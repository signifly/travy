<template>
	<div class="sidebar">
		<div class="sections">
			<group
				v-for="group in sidebar"
				ref="group"
				:key="group.id"
				v-bind="[group, {fieldAlt}]"
				@fieldA="fieldA"
			/>
		</div>
	</div>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import {merge, get, set} from "lodash";
import group from "./group";

export default {
	components: {group},
	props: {
		endpoint: {type: Object, required: true},
		sidebar: {type: Array, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			state: {
				data: this.data,
				options: null,
				error: null,
				edit: false,
				payload: {}
			}
		}
	},
	computed: {
		endpointUrl: (t) => rStringProps({data: t.state.data, val: t.endpoint.url}),
		modifiers: (t) => t.$route.query.modifiers,

		fieldAlt: (t) => ({
			errors: get(t.state.error, "errors"),
			options: t.state.options,
			data: t.state.data
		}),

		actions: (t) => ({
			refresh: (e) => t.$emit("refresh", e),
			refreshData: (e) => t.$emit("refreshData", e),

			update: async ({data}) => {
				// {"key1.key2": 1} ===> {key1: {key2: 1}}
				data = Object.entries(data).reduce((obj, [key, val]) => set(obj, key, val), {});

				// merge payload with data
				t.state.payload = merge({}, t.state.payload, data);

				// merge dataC with data
				t.state.data = merge({}, t.state.data, data);

				t.state.edit = true;
			}
		})
	},
	methods: {
		fieldA({action, data, done}) {
			if (this.actions[action]) this.actions[action]({data, done});
		},
		async save() {
			if (!this.state.edit) return;

			try {
				const {data: {data, options}} = await this.$axios.put(this.endpointUrl, {
					modifier: this.modifiers,
					data: this.state.payload
				}, {customErr: true});

				this.state = {
					data,
					options,
					payload: {},
					error: null,
					edit: false
				};
			} catch({errors}) {
				this.state.error = {errors};
			}
		}
	},
	watch: {
		"state.edit"(edit) {
			this.$emit("edit", edit);
		}
	}
};
</script>

<style lang="scss" scoped>
.sidebar {
	.sections {
		margin-top: 2.5em;
	}
}
</style>
