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
			:is="comp"
		/>
	</div>
</template>

<script>
import {rStringProps, operator} from "@/modules/utils";

export default {
	props: {
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
			// close if not inside this element and inside browser (don't close when tabbing out)
			if (!this.$el.contains(e.relatedTarget) && e.sourceCapabilities) {
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
				const {url, external} = this.onSubmit;
				const link = rStringProps({data, val: url});

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
