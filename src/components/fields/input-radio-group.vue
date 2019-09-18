<template>
	<div class="input-radio-group">
		<RadioGroup :value="value" size="medium" @input="update">
			<RadioButton
				v-for="item in items"
				:label="item._value"
				:disabled="item._disabled"
				:key="item._value"
			>
				{{ item._label }}
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
					{_label: "Option A", _value: true},
					{_label: "Option B", _value: false},
					{_label: "Option C", _value: 3},
					{_label: "Option D", _value: 4, _disabled: true}
				]
			},
			data: {
				option: true
			}
		}
	},
	props: {
		value: {type: [String, Number, Boolean], required: false, doc: true},
		items: {type: Array, required: true, doc: true}
	},
	methods: {
		update(value) {
			this.$emit("event", {
				actions: {
					update: {data: {value}}
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
