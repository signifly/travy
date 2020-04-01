<template>
	<vForm
		v-bind="{loading, error, message, fields, data}"
		title="Reset password"
		@submit="reset"
		@event="event"
	>
		<template slot="actions">
			<Button size="medium" icon="el-icon-back" @click="login">
				Login
			</Button>
			<Button
				native-type="submit"
				v-bind="{loading}"
				type="primary"
				size="medium"
			>
				{{ $translate({en: "Reset", da: "Nulstil"}) }}
			</Button>
		</template>
	</vForm>
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
					fieldType: {
						id: "input-text",
						props: {
							value: "{email}"
						}
					}
				},
				{
					name: "New password",
					fieldType: {
						id: "input-password",
						props: {
							value: "{password}"
						}
					}
				},
				{
					name: "Confirm password",
					fieldType: {
						id: "input-password",
						props: {
							value: "{password_confirmation}"
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
				this.loading = true;
				this.message = "";

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
				da: "Nulstil password",
				en: "Reset password"
			})
		});
	}
};
</script>
