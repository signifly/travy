<template>
	<div class="popover">
		<Popover v-model="_active" :placement="placement" trigger="click" width="200">
			<slot>
				<div class="content">
					<div class="text">{{text}}</div>
					<div class="buttons">
						<Button size="mini" :disabled="loading" @click="close">Cancel</Button>
						<Button size="mini" type="primary" :loading="loading" @click="submit">Submit</Button>
					</div>
				</div>
			</slot>

			<slot name="button" slot="reference" />
		</Popover>
	</div>
</template>

<script>
import {Popover, Button} from "element-ui";

export default {
	components: {Popover, Button},
	props: {
		placement: {type: String, required: false},
		text: {type: String, required: false, default: "Are you sure?"},
		loading: {type: Boolean, required: false},
		active: {type: Boolean, required: false}
	},
	computed: {
		_active: {
			get() {
				return this.active;
			},
			set(bool) {
				this.$emit("update:active", bool);
			}
		}
	},
	methods: {
		close() {
			this._active = false;
		},
		submit() {
			this.$emit("submit");
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.text {
		word-break: break-word;
		text-align: left;
		margin-bottom: 1em;
		font-size: 0.85em;
	}
	.buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
}
</style>
