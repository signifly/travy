<template>
	<div class="action" v-if="!disabled">
		<slot/>

		<component
			v-if="active"
			:is="props.id"
			v-bind="[actionProps, propsC, {data}]"
			@event="$emit('event', $event)"
			@close="close"
			@submit="submit"
		/>
	</div>
</template>

<script>
import {get, eq, gt, gte, lt, lte, mapValues} from "lodash";
import {rStringProps} from "@/modules/utils";
import dropdown from "./dropdown.vue";
import modal from "./modal.vue";
import popup from "./popup.vue";
import show from "./show.vue";

export default {
	components: {dropdown, modal, popup, show},
	props: {
		actionProps: {type: Object, required: false},
		active: {type: Boolean, required: true},
		props: {type: Object, required: true},
		data: {type: Object, required: false}, // parent data
		hide: {type: Object, required: false} // {key, operator, value}
	},
	computed: {
		payload: ({props, data}) => ({
			type: get(props, "payload.type"),
			data: mapValues(get(props, "payload.data"), (val) => get(data, val, val))
		}),

		dataComb: (t) => ({ // parent data and action data combined
			...t.data,
			...t.payload.data
		}),

		propsC: (t) => ({
			...rStringProps({
				data: t.dataComb,
				val: t.props
			}),
			payload: t.payload
		}),

		disabled() {
			if (!this.hide) return false;

			const op = ({eq, gt, gte, lt, lte})[this.hide.operator];
			const key = get(this.dataComb, this.hide.key);
			const value = this.hide.value;
			return op(key, value);
		}
	},
	methods: {
		submit({data, title, message}) {
			if (title && message) {
				this.$store.dispatch("notify/send", {type: "info", title, message});
			}

			if (this.propsC.onSubmit) {
				this.$router.push(rStringProps({data, val: this.propsC.onSubmit}));
			} else {
				this.$emit("event", {
					done: async () => this.close(),
					actions: {refresh: {data: true}}
				});
			}
		},

		close() {
			this.$emit("close");
		}
	}
};
</script>

<style lang="scss" scoped>
.action {
	position: relative;
}
</style>
