<template>
	<div class="sidebar">
		<div class="sections">
			<group
				v-for="group in sidebar"
				ref="group"
				:key="group.id"
				v-bind="[group, {fieldAlt}]"
				@event="event"
			/>
		</div>
	</div>
</template>

<script>
import {rStringProps, mergeData} from "@/modules/utils";
import {get, set} from "lodash";
import group from "./group";

export default {
	components: {group},
	props: {
		endpoint: {type: Object, required: true},
		sidebar: {type: Array, required: true},
		state: {type: Object, required: true}
	},
	data() {
		return {
			payload: {}
		};
	},
	computed: {
		endpointUrl: (t) => rStringProps({data: t.state.data, val: t.endpoint.url}),
		modifiers: (t) => t.$route.query.modifiers,

		fieldAlt: (t) => ({
			errors: get(t.state.error, "errors"),
			options: t.state.options,
			data: t.state.data
		})
	},
	methods: {
		updateState(obj) {
			this.$emit("update:state", {...this.state, ...obj});
		},
		async event({actions, done}) {
			if (actions.update) {
				let {data} = actions.update;

				// {"key1.key2": 1} ===> {key1: {key2: 1}}
				data = Object.entries(data).reduce(
					(obj, [key, val]) => set(obj, key, val),
					{}
				);

				// merge payload with data
				this.payload = mergeData(this.payload, data);

				// merge dataC with data
				this.updateState({
					data: mergeData(this.state.data, data),
					edit: true
				});
			}

			if (done) await done();
		},

		async save() {
			if (!this.state.edit) return;

			const {
				data: {data, options}
			} = await this.$axios.put(
				this.endpointUrl,
				{
					modifier: this.modifiers,
					data: this.payload
				},
				{customErr: true}
			);

			this.payload = {};

			this.updateState({
				data,
				options,
				edit: false,
				error: null
			});

			return {refresh: {data: true}};
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
