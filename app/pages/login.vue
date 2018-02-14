<template>
	<div class="login">
		<div class="box">
			<div class="title">Login</div>
			<Form class="form" title="iskf" :model="form" label-position="top" @keydown.native.enter="login">
				<field v-for="field in fields" v-bind="field" :data="form" :errors="error.errors" :key="field.name" @fieldA="fieldA" />

				<div class="actions">
					<Button type="primary" size="medium" v-bind="{loading}" @click="login">Login</Button>
				</div>
			</Form>

			<div class="error" v-if="error.message">{{error.message}}</div>
		</div>
	</div>
</template>

<script>
import {Form, FormItem, Input, Button} from "element-ui";
import field from "@/components/field.vue";

export default {
	components: {Form, FormItem, Input, Button, field},
	props: {
		route: {type: Object, required: false, default: () => ({name: "index"})}
	},
	data() {
		return {
			loading: false,
			error: {},

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

			form: {
				email: "",
				password: ""
			}
		}
	},
	methods: {
		fieldA({data}) {
			this.form = {...this.form, ...data};
		},

		async login() {
			try {
				this.loading = true;
				const {data} = await this.$http.post("login", this.form, {custom: true});
				this.$store.commit("user/login", {data, route: {...this.route}});
			} catch ({response}) {
				this.error = response.data;
			} finally {
				this.loading = false;
			}
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
			}
		}

		.error {
			margin-top: 1em;
			font-size: 0.875em;
			color: $danger;
		}
	}
}
</style>
