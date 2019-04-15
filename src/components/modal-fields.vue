<template>
	<div class="modal">
		<Dialog
			v-bind="{width, title}"
			:visible.sync="visibleC"
			:close-on-click-modal="false"
			:append-to-body="true"
			:modal-append-to-body="true"
		>
			<div class="fields">
				<vField
					v-for="field in fields"
					:key="field.name"
					v-bind="field"
					:alt="{data, errors, loading}"
					@event="$emit('event', $event)"
				/>
			</div>

			<div class="footer" slot="footer">
				<div class="actions">
					<Button @click="visibleC = false" :disabled="!!loading">{{
						buttonCancelText
					}}</Button>
					<Button type="primary" @click="submit" :loading="!!loading">{{
						buttonSubmitText
					}}</Button>
				</div>

				<div class="error" v-if="error.message">{{ error.message }}</div>

				<slot name="footer" />
			</div>
		</Dialog>
	</div>
</template>

<script>
import {Dialog, Button} from "element-ui";
import vField from "./field";

export default {
	components: {Dialog, Button},
	props: {
		fields: {type: Array, required: true},
		data: {type: Object, required: true},
		error: {type: Object, required: true},
		title: {type: String, required: false},
		loading: {type: [Boolean, Number], required: false},

		width: {type: String, default: "700px"},
		visible: {type: Boolean, required: false},
		buttonSubmitText: {type: String, default: "Submit"},
		buttonCancelText: {type: String, default: "Cancel"}
	},
	computed: {
		errors: (t) => t.error.errors,

		visibleC: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit("update:visible", false);
			}
		}
	},
	methods: {
		submit() {
			this.$emit("submit");
		},
		enter({key}) {
			if (key === "Enter") this.submit();
		}
	},
	mounted() {
		this.$el.addEventListener("keyup", this.enter);
	},
	beforeDestroy() {
		this.$el.removeEventListener("keyup", this.enter);
	},
	beforeCreate() {
		this.$options.components.vField = vField;
	}
};
</script>

<style lang="scss" scoped>
.modal {
	text-align: left;
}

.fields {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: -$fieldMargin 0;
}

.footer {
	.error {
		margin-top: 1em;
		font-size: 0.875em;
		color: $danger;
	}
}
</style>
