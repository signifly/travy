<template>
	<div class="modal">
		<Dialog v-bind="{width, title}" :visible.sync="_visible">
			<vField
			v-for="field in fields"
			:key="field.name"
			:errors="error.errors"
			v-bind="[field, {data}]"
			@fieldA="$emit('fieldA', $event)"/>

			<div class="footer" slot="footer">
				<slot name="footer">
					<div class="actions">
						<Button @click="_visible = false" :disabled="loading">{{buttonCancelText}}</Button>
						<Button type="primary" @click="$emit('submit')" :loading="loading">{{buttonSubmitText}}</Button>
					</div>

					<div class="error" v-if="error.message">{{error.message}}</div>
				</slot>
			</div>
		</Dialog>
	</div>
</template>

<script>
import {Dialog, Button} from "element-ui";
import vField from "./field.vue";

export default {
	components: {Dialog, Button},
	props: {
		fields: {type: Array, required: true},
		data: {type: Object, required: true},
		title: {type: String, required: false},
		error: {type: Object, required: true},
		loading: {type: Boolean, required: false},

		width: {type: String, default: "500px"},
		visible: {type: Boolean, required: false},
		buttonSubmitText: {type: String, default: "Submit"},
		buttonCancelText: {type: String, default: "Cancel"}
	},
	computed: {
		_visible: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit("update:visible", false);
			}
		}
	},
	beforeCreate() {
		this.$options.components.vField = vField;
	}
};
</script>

<style lang="scss" scoped>
.footer {
	.error {
		margin-top: 1em;
		font-size: 0.875em;
		color: $danger;
	}
}
</style>
