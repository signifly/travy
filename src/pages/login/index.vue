<template>
	<div class="login">
		<vForm title="Login" v-bind="{loading, error, message, fields, data}" @fieldA="fieldA" @submit="login">
			<template slot="actions">
				<a class="reset" :class="{loading}" @click="password">Reset password</a>
				<Button type="primary" size="medium" v-bind="{loading}" @click="login">Login</Button>
			</template>
		</vForm>
	</div>
</template>

<script>
import {mapKeys, get} from "lodash";
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
						id: "vInput",
						props: {
							value: "email"
						}
					}
				},
				{
					name: "password",
					label: "Password",
					fieldType: {
						id: "vInputPassword",
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
		fieldA({data}) {
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
			} catch (err) {
				this.error = get(err, "response.data", {});
			} finally {
				this.loading = false;
			}
		},

		async password() {
			try {
				this.reset();
				this.loading = true;
				const {data} = await this.$http.post("password/email", this.data, {custom: true});
				this.message = data.message;
			} catch (err) {
				console.log(err);
				this.error = get(err, "response.data", {});
				this.error.errors = mapKeys(this.error.errors, (val, key) => `data.${key}`);
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
