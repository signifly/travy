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
import {rStringProps, mergeData, mapPaths} from "@/modules/utils";
import group from "./group";
import {get} from "lodash";

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
		edit: (t) => t.state.edits.sidebar,

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

				data = mapPaths(data);

				// merge payload with data
				this.payload = mergeData(this.payload, data);

				// merge dataC with data
				this.updateState(
					mergeData(this.state, {
						data,
						edits: {sidebar: true}
					})
				);
			}

			if (done) await done();
		},

		async save() {
			if (!this.edit) return;

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
