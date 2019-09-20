<template>
	<div class="select">
		<Select
			v-bind="{value}"
			:disabled="_disabled"
			:clearable="_clearable"
			:filterable="true"
			@change="update"
		>
			<Option v-for="item in _items" v-bind="item" :key="item.value">
				<div class="option">
					<div class="emoji" v-if="item.emoji" v-html="emoji(item.emoji)" />
					{{ item.label }}
				</div>
			</Option>
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";
import emoji from "emojilib";

export default {
	components: {Select, Option},
	meta: {
		res: {
			props: {
				_disabled: false,
				_clearable: false,
				value: "selectValue",

				_items: [
					{label: "Danmark", emoji: "denmark", value: "dk"},
					{label: "England", emoji: "uk", value: "uk"},
					{label: "Murica", emoji: "us", value: "us", disabled: true}
				]
			},
			data: {
				selectValue: "uk"
			}
		}
	},
	props: {
		_clearable: {type: Boolean, required: false, default: true},
		value: {type: [String, Number], required: false},
		_disabled: {type: Boolean, required: false},
		_items: {type: Array, required: true}
	},
	methods: {
		emoji(name) {
			return emoji.lib[name] && emoji.lib[name].char;
		},

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
.select {
	.el-select {
		width: 100%;
	}
}

.option {
	display: flex;
	align-content: center;

	.emoji {
		margin-right: 0.75em;
		margin-top: 0.1em;
	}
}
</style>
