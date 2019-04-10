<template>
	<div class="select">
		<Select
		v-bind="{size, value}"
		:disabled="_disabled"
		:clearable="_clearable"
		:filterable="true"
		@change="update">

			<Option v-for="item in _options" v-bind="item" :key="item.value">
				<div class="option">
					<div class="emoji" v-if="item.emoji" v-html="emoji(item.emoji)"/>
					{{item.label}}
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
				disabled: false,
				value: "selectValue",

				options: [
					{label: "Danmark", emoji: "denmark", value: "dk"},
					{label: "England", emoji: "uk", value: "uk"},
					{label: "Murica", emoji: "us", value: "us", disabled: true},
				]
			},
			data: {
				selectValue: "uk"
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		meta: {type: Object, require: false, default: () => ({})},
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_options: {type: Array, required: true, doc: true},
		value: {type: [String, Number], required: false, doc: true},
		_value: {type: String, required: true}
	},
	computed: {
		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return "medium";
		}
	},
	methods: {
		emoji(name) {
			return emoji.lib[name] && emoji.lib[name].char;
		},

		update(value) {
			this.$emit("event", {
				actions: {
					update: {data: {[this._value]: value}}
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
