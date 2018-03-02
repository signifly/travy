<template>
	<div class="modal">
		<Button :type="_buttonType" :icon="`el-icon-${_buttonIcon}`" @click="modal = true">{{_buttonText}}</Button>

		<vModalFields
			v-bind="{loading, error}"
			:visible.sync="modal"
			:fields="_fields"
			:data="dataComb"
			:title="_modalTitle"
			@fieldA="fieldA"
			@submit="save"/>
	</div>
</template>

<script>
import {Button} from "element-ui";
import vModalFields from "@/components/modal-fields.vue";

export default {
	components: {Button, vModalFields},
	meta: {
		res: {
			props: {
				buttonText: "button",
				buttonIcon: "plus",
				buttonType: "primary",
				modalTitle: "modal title",

				endpointId: "postid",

				endpoint: {
					method: "post",
					url: "https://api.sikane.signifly.com/v1/stock-item-models/{id}"
				},

				fields: [
					{
						name: "text",
						label: "some text",
						fieldType: {
							id: "vInput",
							props: {
								value: "value"
							}
						}
					}
				],
				fieldsData: {
					value: ""
				}
			},
			data: {
				postid: "1",
			}
		}
	},
	props: {
		rootData: {type: Object, required: true},
		_buttonText: {type: String, required: true, doc: true},
		_buttonIcon: {type: String, required: false, doc: true},
		_buttonType: {type: String, required: false, doc: true},
		_modalTitle: {type: String, required: true, doc: true},
		endpointId: {type: [String, Number], required: true, doc: true},
		_endpoint: {type: Object, required: true, doc: true},
		_fields: {type: Array, required: true, doc: true},
		_fieldsData: {type: Object, required: true, doc: true},
	},
	data() {
		return {
			error: {},
			payload: {},
			loading: false,
			modal: false
		}
	},
	computed: {
		dataComb: (t) => ({...t.rootData, fieldsData: t._fieldsData})
	},
	methods: {
		fieldA({data}) {
			this.payload = {...this.payload, ...data};
		},

		async save() {
			const ept = this._endpoint;
			const url = ept.url.replace("{id}", this.endpointId);

			try {
				this.loading = true;
				await this.$http[ept.method](url, {data: this.payload}, {custom: true});
				this.$emit("fieldA", {action: "getData"});
				this.modal = false;
			} catch({response}) {
				this.error = response.data;
			} finally {
				this.loading = false;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.footer {
	.error {
		margin-top: 1em;
		font-size: 0.875em;
		color: $danger;
	}
}
</style>
