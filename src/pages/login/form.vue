<template>
	<div class="loginform">
		<div class="header">{{ header }}</div>
		<div class="box">
			<div class="title">{{ title }}</div>
			<Form
				class="form"
				:model="data"
				label-position="top"
				@keydown.native.enter="$emit('submit')"
			>
				<field
					v-for="field in fields"
					:key="field.attribute"
					v-bind="{field, data, error}"
					@event="$emit('event', $event)"
				/>

				<div class="actions">
					<slot name="actions" />
				</div>
			</Form>

			<div class="text error" v-if="error.message">{{ error.message }}</div>
			<div class="text message" v-if="message">{{ message }}</div>
		</div>
	</div>
</template>

<script>
import {Form} from "element-ui";
import field from "@/components/field";

export default {
	components: {Form, field},
	props: {
		error: {type: Object, default: () => ({})},
		loading: {type: Boolean, required: false},
		message: {type: String, required: true},
		title: {type: String, required: true},
		fields: {type: Array, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		header: (t) => t.$store.getters["config/title"]
	}
};
</script>

<style lang="scss" scoped>
.loginform {
	display: flex;
	flex-direction: column;
	height: 72vh;
	align-items: center;
	justify-content: center;

	.header {
		margin-bottom: 1em;
		color: $blue4;
	}

	.box {
		border: 1px solid $blue2;
		border-radius: 4px;
		padding: 1.5em 1.5em;

		> .title {
			font-weight: 500;
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
