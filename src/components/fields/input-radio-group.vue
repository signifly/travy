<template>
	<div class="input-radio-group">
		<RadioGroup v-bind="{value}" size="medium" @input="update">
			<RadioButton
				:disabled="item.disabled"
				v-for="item in items"
				:label="item.value"
				:key="item.value"
			>
				{{ item.label }}
			</RadioButton>
		</RadioGroup>
	</div>
</template>

<script>
import {RadioGroup, RadioButton} from "element-ui";

export default {
	components: {RadioGroup, RadioButton},
	meta: {
		spec: {
			value: {type: [String, Number, Boolean], required: false},
			items: {
				type: Array,
				required: true,
				children: {
					value: {type: [String, Number, Boolean], required: true},
					disabled: {type: Boolean, required: false},
					label: {type: String, required: true}
				}
			}
		},
		res: {
			props: {
				value: "{option}",
				items: [
					{label: "Option A", value: true},
					{label: "Option B", value: false},
					{label: "Option C", value: 3},
					{label: "Option D", value: 4, disabled: true}
				]
			},
			data: {
				option: true
			}
		}
	},
	props: {
		value: {type: [String, Number, Boolean], required: false},
		items: {type: Array, required: true}
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
