<template>
	<div class="reset-password">
		<vForm
			title="Reset password"
			v-bind="{loading, error, message, fields, data}"
			@event="event"
			@submit="reset"
		>
			<template slot="actions">
				<Button size="medium" icon="el-icon-arrow-left" @click="login">
					Login
				</Button>
				<Button type="primary" size="medium" v-bind="{loading}" @click="reset">
					{{ $translate({en: "Reset", da: "Nulstil"}) }}
				</Button>
			</template>
		</vForm>
	</div>
</template>

<script>
import {Button} from "element-ui";
import vForm from "./form.vue";

export default {
	components: {vForm, Button},
	props: {
		route: {type: Object, required: false, default: () => ({name: "index"})},
		id: {type: String, required: true}
	},
	data() {
		return {
			error: undefined,
			loading: false,
			message: "",

			fields: [
				{
					name: "Email",
					attribute: "email",
					fieldType: {
						id: "input-text",
						props: {
							value: "email"
						}
					}
				},
				{
					name: "New password",
					attribute: "password",
					fieldType: {
						id: "input-password",
						props: {
							value: "password"
						}
					}
				},
				{
					name: "Confirm password",
					attribute: "password-confirmation",
					fieldType: {
						id: "input-password",
						props: {
							value: "password_confirmation"
						}
					}
				}
			],

			data: {
				email: "",
				password: "",
				password_confirmation: ""
			}
		};
	},
	methods: {
		event({actions}) {
			const {data} = actions.update;
			this.data = {...this.data, ...data};
		},

		login() {
			this.$router.push({name: "login"});
		},

		async reset() {
			try {
				this.error = undefined;
				this.message = "";
				this.loading = true;

				const {data} = await this.$axios.post(
					"password/reset",
					{...this.data, token: this.id},
					{customErr: true}
				);

				this.message = data.message;
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		}
	},
	created() {
		this.$store.dispatch("base/meta", {
			title: this.$translate({
				en: "Reset login",
				da: "Nulstil login"
			})
		});
	}
};
</script>
