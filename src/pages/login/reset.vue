<template>
	<div class="reset-password">
		<vForm title="Reset password" v-bind="{loading, error, message, fields, data}" @event="event" @submit="reset">
			<template slot="actions">
				<Button size="medium" icon="el-icon-arrow-left" @click="login">Login</Button>
				<Button type="primary" size="medium" v-bind="{loading}" @click="reset">
					{{$translate({
						en: "Reset",
						da: "Nulstil"
					})}}
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
			loading: false,
			message: "",
			error: {},

			fields: [
				{
					name: "email",
					label: "Email",
					fieldType: {
						id: "input-text",
						props: {
							value: "email"
						}
					}
				},
				{
					name: "password",
					label: "New password",
					fieldType: {
						id: "input-password",
						props: {
							value: "password"
						}
					}
				},
				{
					name: "password-confirmation",
					label: "Confirm password",
					fieldType: {
						id: "input-password",
						props: {
							value: "password_confirmation"
						}
					}
				}
			],

			data: {
				email: "",
				password: "",
				password_confirmation: ""
			}
		}
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
				this.error = {};
				this.message = "";
				this.loading = true;
				const {data} = await this.$axios.post("password/reset", {...this.data, token: this.id}, {customErr: true});
				this.message = data.message;
			} catch(err) {
				this.error = err;
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>
