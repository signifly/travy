<template>
	<div class="action" v-if="!disabled">
		<slot/>

		<component
			v-if="active"
			:is="props.id"
			v-bind="[props, {dataComb, endpoint}]"
			@close="close"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import {get, eq, gt, gte, lt, lte} from "lodash";
import {endpointUrl} from "@/modules/utils";
import modal from "./modal.vue";
import popup from "./popup.vue";
import show from "./show.vue";

export default {
	components: {modal, popup, show},
	props: {
		active: {type: Boolean, required: true},
		props: {type: Object, required: true},
		data: {type: Object, required: false},
		hide: {type: Object, required: false} // {key, operator, value}
	},
	computed: {
		dataComb: (t) => ({...t.data, ...t.props.data}), // parent data and action data combined

		endpoint: (t) => ({
			method: get(t.props, "endpoint.method"),
			url: endpointUrl({data: t.dataComb, url: get(t.props, "endpoint.url")})
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
		close() {
			this.$emit("close");
		},
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.action {
	position: relative;
}
</style>
