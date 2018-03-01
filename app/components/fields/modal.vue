<template>
	<div class="modal">
		vModal
	</div>
</template>

<script>

export default {
	meta: {
		res: {
			props: {
				buttonText: "button",
				buttonIcon: "plus",
				buttonType: "primary",
				modalTitle: "modal title",

				endpoint: {
					method: "post",
					url: "https://api.sikane.signifly.com/v1/stock-item-models"
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

			}
		}
	},
	props: {
		_buttonText: {type: String, required: true, doc: true},
		_buttonIcon: {type: String, required: false, doc: true},
		_buttonType: {type: String, required: false, doc: true},
		_modalTitle: {type: String, required: true, doc: true},
		_fields: {type: Array, required: true, doc: true},
		_fieldsData: {type: Object, required: true, doc: true}
	},
	data() {
		return {

		}
	},
	methods: {
		update(val) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._value]: val}
			});
		}
	}
}
</script>
