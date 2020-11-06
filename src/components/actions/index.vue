<template>
	<div class="action" v-if="Show" tabindex="0" @blur="blur">
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
		show: {type: Array, required: false}, // [{key, operator, value}]
		id: {type: String, required: true},
		reloadAfterSuccess: {type: Boolean, default: false}
	},
	computed: {
		comp() {
			return () => import(/* webpackMode: "eager" */ `./${this.id}.vue`);
		},
		Show() {
			if (this.show) {
				return this.show.some((x) => operator({...x, data: this.data}));
			} else {
				return true;
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
			} else if (this.reloadAfterSuccess) {
				window.location.reload();
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
