<template>
	<div class="input-radio-group">
		<RadioGroup :value="value" size="medium" @input="update">
			<RadioButton
			v-for="item in _items"
			:label="item.value"
			:disabled="item.disabled"
			:key="item.value">
				{{item.label}}
			</RadioButton>
		</RadioGroup>
	</div>
</template>

<script>
import {RadioGroup, RadioButton} from "element-ui";

export default {
	components: {RadioGroup, RadioButton},
	meta: {
		res: {
			props: {
				value: "option",
				items: [
					{label: "Option A", value: 1},
					{label: "Option B", value: 2},
					{label: "Option C", value: 3},
					{label: "Option D", value: 4, disabled: true}
				]
			},
			data: {
				option: 1
			}
		}
	},
	props: {
		value: {type: [String, Number], required: false, doc: true},
		_items: {type: Array, required: true, doc: true},
		_value: {type: String, required: true}
	},
	methods: {
		update(value) {
			this.$emit("fieldA", {
				actions: {
					update: {data: {[this._value]: value}}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input-radio-group {

}
</style>
