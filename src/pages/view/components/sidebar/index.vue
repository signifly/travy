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
		options: {type: Object, required: false},
		sidebar: {type: Array, required: true},
		edit: {type: Boolean, required: false},
		data: {type: Object, required: true}
	},
	data() {
		return {
			payload: {},
			error: null
		};
	},
	computed: {
		endpointUrl: (t) => rStringProps({data: t.data, val: t.endpoint.url}),
		modifiers: (t) => t.$route.query.modifiers,

		fieldAlt: (t) => ({
			errors: get(t.error, "errors"),
			options: t.options,
			data: t.data
		})
	},
	methods: {
		async event({actions, done}) {
			if (actions.update) {
				let {data} = actions.update;

				data = mapPaths(data);

				// merge payload with data
				this.payload = mergeData(this.payload, data);

				// merge data with data
				this.$emit("update:data", mergeData(this.data, data));

				// update sidebar edit
				this.$emit("update:edit", true);
			}

			if (done) await done();
		},

		async save() {
			if (!this.edit) return;

			try {
				await this.$axios.put(
					this.endpointUrl,
					{
						modifier: this.modifiers,
						data: this.payload
					},
					{customErr: true}
				);

				this.payload = {};
				this.error = null;

				return {actions: {refresh: {data: true}}};
			} catch (error) {
				this.error = error;
				throw error;
			}
		}
	}
};
</script>
