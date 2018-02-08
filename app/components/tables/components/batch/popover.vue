<template>
	<div class="pop">
		<Popover v-model="active" placement="top-end" ref="pop">
			<div class="content">
				<div class="text">
					{{desc}}
				</div>
				<div class="buttons">
					<Button size="mini" :disabled="loading" @click="close">Cancel</Button>
					<Button size="mini" type="primary" :loading="loading" @click="save">Confirm</Button>
				</div>
			</div>
		</Popover>

		<div class="hook" v-popover:pop />
	</div>
</template>

<script>
import {get} from "lodash";
import {Popover, Button} from "element-ui";

export default {
	components: {Popover, Button},
	props: {
		action: {type: Object, required: false},
		popover: {type: Boolean, required: false}
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		data: (t) => get(t.action, "data"),
		desc: (t) => get(t.action, "description"),

		active: {
			get() {
				return this.popover;
			},
			set(bool) {
				this.$emit("update:popover", bool);
			}
		}
	},
	methods: {
		close() {
			this.active = false;
		},

		save() {
			this.loading = true;

			this.$emit("save", {
				data: this.data,
				done: () => {
					this.loading = false;
					this.close();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pop {
	.hook {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
}

.content {
	.text {
		word-break: break-word;
		text-align: left;
		margin-bottom: 1em;
		font-size: em(15);
	}
	.buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
}
</style>
