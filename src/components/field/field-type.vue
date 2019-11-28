<template>
	<div class="fieldType">
		<component :is="customField || field" v-bind="mapProps" @event="event" />
	</div>
</template>

<script>
import {mapProps, mapPaths} from "@/modules/utils";
import {FormItem} from "element-ui";
import {mapKeys, get} from "lodash";
import produce from "immer";

export default {
	components: {FormItem},
	props: {
		data: {type: Object, default: () => ({})},
		props: {type: Object, required: true},
		id: {type: String, required: true}
	},
	computed: {
		mapProps: (t) => mapProps({props: t.props, data: t.data}),
		customField: (t) => t.$opts.fields[t.id],

		field() {
			const id = this.id;
			return () => import(/* webpackMode: "eager" */ `../fields/${id}.vue`);
		}
	},
	methods: {
		event(event) {
			const newEvent = produce(event, (draft) => {
				const update = draft.actions.update;

				if (update) {
					// reverse map props
					update.data = mapKeys(update.data, (val, key) => {
						return get(this.props, key);
					});

					update.data = mapPaths(update.data);
				}
			});

			this.$emit("event", newEvent);
		}
	}
};
</script>

<style lang="scss" scoped>
.fieldType {
	width: 100%;
}
</style>
