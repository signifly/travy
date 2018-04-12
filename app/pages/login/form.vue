<template>
	<div class="login">
		<div class="box">
			<div class="title">{{title}}</div>
			<Form class="form" :model="data" label-position="top" @keydown.native.enter="$emit('submit')">

				<vField
					v-for="field in fields"
					:key="field.name"
					:alt="{data, errors}"
					v-bind="field"
					@fieldA="fieldA"
				/>

				<div class="actions">
					<slot name="actions" />
				</div>
			</Form>

			<div class="text error" v-if="error.message">{{error.message}}</div>
			<div class="text message" v-if="message">{{message}}</div>
		</div>
	</div>
</template>

<script>
import {Form, Button} from "element-ui";
import vField from "@/components/field/index.vue";

export default {
	components: {Form, Button, vField},
	props: {
		title: {type: String, required: true},
		loading: {type: Boolean, required: false},
		error: {type: Object, required: true},
		message: {type: String, required: true},
		fields: {type: Array, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		errors: (t) => t.error.errors
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.login {
	display: flex;
	height: 80vh;
	align-items: center;
	justify-content: center;

	.box {
		border: 1px solid $blue2;
		border-radius: 4px;
		padding: 1.5em 1.5em;

		.title {
			font-size: 1.4em;
			margin-bottom: 1em;
		}

		.form {
			width: 20em;

			.actions {
				margin-top: 1.5em;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.reset {
					font-size: 0.8em;
					color: $danger;
					text-decoration: underline;
				}
			}
		}

		.text {
			margin-top: 1.25em;
			font-size: 0.875em;

			&.error {
				color: $danger;
			}
			&.message {
				color: $success;
			}
		}
	}
}
</style>
