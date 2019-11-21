<template>
	<div class="layout">
		<div class="logo">
			<div class="img" :style="{backgroundImage: `url('${theme.logo}')`}" />
		</div>

		<div class="content">
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

				<div class="text error" v-if="error.message" v-text="error.message" />
				<div class="text message" v-if="message" v-text="message" />
			</div>
		</div>

		<div
			class="image"
			:style="{
				backgroundColor: theme.color,
				backgroundImage: `url('${theme.cover}')`
			}"
		/>
	</div>
</template>

<script>
import field from "@/components/field";

export default {
	components: {field},
	props: {
		error: {type: Object, default: () => ({})},
		loading: {type: Boolean, required: false},
		message: {type: String, required: true},
		title: {type: String, required: true},
		fields: {type: Array, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		theme: (t) => t.$store.getters["config/theme"]
	}
};
</script>

<style lang="scss" scoped>
.layout {
	display: flex;
	height: 100vh;

	.logo {
		justify-content: center;
		display: inline-flex;
		align-items: center;
		position: absolute;
		margin-right: 2em;
		left: 2em;
		top: 1em;

		.img {
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
			width: 180px;
			height: 40px;
		}
	}

	.content {
		justify-content: center;
		align-items: center;
		display: flex;
		width: 50%;

		.box {
			margin-bottom: 25%;

			> .title {
				margin-bottom: 1em;
				font-weight: 700;
				font-size: 32px;
			}

			.form {
				width: 20em;

				.actions {
					justify-content: space-between;
					align-items: center;
					margin-top: 1.5em;
					display: flex;
				}
			}

			.text {
				margin-top: 1.25em;
				font-size: 0.8em;

				&.error {
					color: $danger;
				}
				&.message {
					color: $success;
				}
			}
		}
	}

	.image {
		width: 50%;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
}
</style>
