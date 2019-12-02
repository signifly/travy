<template>
	<div class="sidebar">
		<div class="name" v-text="sidebar.name" />
		<div class="groups">
			<group
				v-for="group in sidebar.groups"
				v-bind="{group, error, options, data}"
				:key="group.name"
				@event="event"
			/>
		</div>
	</div>
</template>

<script>
import {rStringProps, mergeData} from "@/modules/utils";
import group from "./group";

export default {
	components: {group},
	props: {
		endpoint: {type: Object, required: true},
		options: {type: Object, required: false},
		sidebar: {type: Object, required: true},
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
		modifiers: (t) => t.$route.query.modifiers
	},
	methods: {
		async event({actions, done}) {
			if (actions.update) {
				let {data} = actions.update;

				// merge payload with data
				this.payload = mergeData(this.payload, data);

				// merge data with data
				this.$emit("update:data", mergeData(this.data, data));

				// update sidebar edit
				this.$emit("update:edit", true);
			}

			if (done) done();
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

				return {actions: {refresh: true}};
			} catch (error) {
				this.error = error;
				throw error;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.sidebar {
	background-color: $white1;
	border: 1px solid #e0e6ed;
	border-radius: 4px;

	.name {
		border-bottom: 1px solid #f5f7fa;
		align-items: center;
		padding: 0 24px;
		display: flex;
		height: 55px;
	}

	.groups {
		padding: 24px;
	}
}
</style>
