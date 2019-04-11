<template>
	<div class="login">
		<vForm title="Login" v-bind="{loading, error, message, fields, data}" @event="event" @submit="login">
			<template slot="actions">
				<a class="reset" :class="{loading}" @click="resetPassword">
					{{$translate({
						en: "Reset password",
						da: "Nulstil password"
					})}}
				</a>
				<Button type="primary" size="medium" v-bind="{loading}" @click="login">Login</Button>
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
		route: {type: Object, required: false, default: () => ({name: "index"})}
	},
	data() {
		return {
			loading: false,
			error: {},
			message: "",

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
					label: "Password",
					fieldType: {
						id: "input-password",
						props: {
							value: "password"
						}
					}
				},
			],

			data: {
				email: "",
				password: ""
			}
		}
	},
	methods: {
		event({actions}) {
			const {data} = actions.update;
			this.data = {...this.data, ...data};
		},

		reset() {
			this.error = {};
			this.message = "";
		},

		async login() {
			try {
				this.reset();
				this.loading = true;
				await this.$store.dispatch("user/login", {form: this.data, route: {...this.route}});
			} catch(err) {
				this.error = err;
			} finally {
				this.loading = false;
			}
		},

		async resetPassword() {
			try {
				this.reset();
				this.loading = true;
				const {data} = await this.$store.dispatch("user/resetPassword", {form: this.data});
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

<style lang="scss" scoped>
.reset {
	font-size: 0.8em;
	color: $info;

	&:hover {
		text-decoration: underline;
	}

	&.loading {
		pointer-events: none;
	}
}
</style>
