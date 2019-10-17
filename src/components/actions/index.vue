<template>
	<div class="action" v-if="!disabled">
		<slot />

		<component
			@event="$emit('event', $event)"
			@submit="submit"
			v-bind="propsC"
			@close="close"
			:is="props.id"
			v-if="value"
			:data="data"
		/>
	</div>
</template>

<script>
import {rStringProps, operator, mapProps} from "@/modules/utils";
import dropdown from "./dropdown";
import modal from "./modal.vue";
import popup from "./popup.vue";
import show from "./show.vue";
import {get} from "lodash";

export default {
	components: {dropdown, modal, popup, show},
	props: {
		value: {type: Boolean, required: true},
		props: {type: Object, required: true},
		data: {type: Object, required: false}, // parent data
		hide: {type: Object, required: false} // {key, operator, value}
	},
	computed: {
		payload: ({props, data}) => ({
			type: get(props, "payload.type"),
			data: mapProps({props: get(props, "payload.data"), data})
		}),

		tt: (t) =>
			rStringProps({
				data: t.data,
				val: t.props
			}),

		dataComb: (t) => ({
			// parent data and action data combined
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
			if (this.hide) {
				return operator({...this.hide, data: this.dataComb});
			} else {
				return false;
			}
		}
	},
	methods: {
		close() {
			this.$emit("input", false);
		},

		submit({data, title, message}) {
			if (title && message) {
				this.$store.dispatch("notify/send", {type: "info", title, message});
			}

			if (this.propsC.onSubmit) {
				this.$router.push(rStringProps({data, val: this.propsC.onSubmit}));
			} else {
				this.$emit("event", {
					actions: {refresh: true},
					done: this.close
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.action {
	position: relative;
}
</style>
