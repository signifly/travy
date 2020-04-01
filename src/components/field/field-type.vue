<template>
	<div class="fieldType">
		<component :is="customField || field" v-bind="fieldProps" @event="event" />
	</div>
</template>

<script>
import {transProps, mapPaths} from "@/modules/utils";
import {mapKeys, get} from "lodash";
import {FormItem} from "element-ui";
import produce from "immer";

export default {
	components: {FormItem},
	props: {
		error: {type: Object, required: false},
		props: {type: Object, required: true},
		data: {type: Object, required: true},
		id: {type: String, required: true}
	},
	computed: {
		transProps: (t) => transProps({data: t.data, val: t.props}),
		customField: (t) => t.$opts.fields[t.id],
		fieldProps() {
			// add untransformed props and data for fields that does their own transforms like button-action, table
			return {
				...this.transProps,
				__props: this.props,
				__error: this.error,
				__data: this.data
			};
		},

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
						// {key} ==> key
						const [, propValue] = /\{(.*?)\}/g.exec(get(this.props, key));
						return propValue;
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
