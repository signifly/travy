<template>
	<div class="action" v-if="!disabled" tabindex="0" @blur="blur">
		<slot />

		<component
			@event="$emit('event', $event)"
			@submit="submit"
			v-bind="propsC"
			@close="close"
			v-if="value"
			:data="data"
			:is="id"
		/>
	</div>
</template>

<script>
import {rStringProps, operator} from "@/modules/utils";
import dropdown from "./dropdown";
import modal from "./modal.vue";
import popup from "./popup.vue";
import show from "./show.vue";

export default {
	components: {dropdown, modal, popup, show},
	props: {
		onSubmit: {type: String, required: false},
		value: {type: Boolean, required: true},
		props: {type: Object, required: true},
		data: {type: Object, required: false}, // parent data
		hide: {type: Object, required: false}, // {key, operator, value}
		id: {type: String, required: true}
	},
	computed: {
		propsC() {
			return rStringProps({
				data: this.data,
				val: this.props
			});
		},

		disabled() {
			if (this.hide) {
				return operator({...this.hide, data: this.data});
			} else {
				return false;
			}
		}
	},
	methods: {
		blur(e) {
			if (!this.$el.contains(e.relatedTarget)) {
				this.close();
			}
		},

		close() {
			this.$emit("close");
			this.$emit("input", false);
		},

		submit({data, title, message}) {
			if (title && message) {
				this.$store.dispatch("notify/send", {type: "info", title, message});
			}

			if (this.onSubmit) {
				this.$router.push(rStringProps({data, val: this.onSubmit}));
			} else {
				this.$emit("event", {
					actions: {refresh: true},
					done: this.close
				});
			}
		}
	},
	watch: {
		value(val) {
			if (val) {
				this.$el.focus();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.action {
	position: relative;
	outline: none;
}
</style>
