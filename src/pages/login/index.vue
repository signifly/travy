<template>
	<vForm
		v-bind="{loading, error, message, fields, data}"
		@submit="login"
		@event="event"
		title="Login"
	>
		<template slot="actions">
			<a class="reset" :class="{loading}" @click="resetPassword">
				{{ $translate({en: "Reset password", da: "Nulstil password"}) }}
			</a>
			<Button type="primary" size="medium" v-bind="{loading}" @click="login">
				Login
			</Button>
		</template>
	</vForm>
</template>

<script>
import {Button} from "element-ui";
import vForm from "./form";

export default {
	components: {Button, vForm},
	props: {
		route: {type: Object, required: false, default: () => ({name: "home"})}
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
					name: "Password",
					attribute: "password",
					fieldType: {
						id: "input-password",
						props: {
							value: "password"
						}
					}
				}
			],

			data: {
				email: "",
				password: ""
			}
		};
	},
	methods: {
		event({actions}) {
			const {data} = actions.update;
			this.data = {...this.data, ...data};
		},

		reset() {
			this.error = undefined;
			this.message = "";
		},

		async login() {
			try {
				this.reset();
				this.loading = true;
				await this.$store.dispatch("user/login", {
					form: this.data,
					route: {...this.route}
				});
			} catch (error) {
				this.error = error;
			} finally {
				this.loading = false;
			}
		},

		async resetPassword() {
			try {
				this.reset();
				this.loading = true;
				const {data} = await this.$store.dispatch("user/resetPassword", {
					form: this.data
				});
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
				en: "Login",
				da: "Login"
			})
		});
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
