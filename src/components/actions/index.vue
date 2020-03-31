<template>
	<div class="action" v-if="!disabled" tabindex="0" @blur="blur">
		<slot />

		<component
			@event="$emit('event', $event)"
			:actionOpts="actionOpts"
			@submit="submit"
			v-bind="props"
			@close="close"
			v-if="value"
			:data="data"
			:is="comp"
		/>
	</div>
</template>

<script>
import {transProps, operator} from "@/modules/utils";
// import {merge} from "lodash";

export default {
	props: {
		actionOpts: {type: Object, default: () => ({})},
		onSubmit: {type: Object, required: false},
		value: {type: Boolean, required: true},
		props: {type: Object, required: true},
		data: {type: Object, required: false}, // parent data
		hide: {type: Object, required: false}, // {key, operator, value}
		id: {type: String, required: true}
	},
	computed: {
		comp() {
			return () => import(/* webpackMode: "eager" */ `./${this.id}.vue`);
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
			// close if not inside this element and inside browser (don't close when tabbing out)
			if (!this.$el.contains(e.relatedTarget) && e.sourceCapabilities) {
				this.close();
			}
		},

		close() {
			this.$emit("close");
			this.$emit("input", false);
		},

		submit({data, notification}) {
			if (notification) {
				this.$store.dispatch("notify/send", {type: "info", ...notification});
			}

			if (this.onSubmit) {
				const {url, external} = this.onSubmit;
				const link = transProps({data, val: url});

				if (external) {
					window.location.href = link;
				} else {
					this.$router.push(link);
				}
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
