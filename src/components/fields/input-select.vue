<template>
	<div class="select">
		<Select
		v-bind="{size, value}"
		:disabled="_disabled"
		:clearable="_clearable"
		:filterable="true"
		@change="update">

			<Option v-for="item in itemsMap" v-bind="item" :key="item.value">
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
				items: "selectOptions",
				options: {
					label: "name",
					value: "id"
				}
			},
			data: {
				selectValue: "DK",
				selectOptions: [
					{
						name: "Danmark",
						emoji: "denmark",
						id: "DK"
					},
					{
						name: "England",
						emoji: "uk",
						id: "UK"
					},
					{
						name: "Murica",
						disabled: true,
						emoji: "us",
						id: "US",
					}
				]
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		meta: {type: Object, require: false, default: () => ({})},
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_options: {type: Object, required: true, doc: true},
		value: {type: [String, Number], required: false, doc: true},
		_value: {type: String, required: true},
		items: {type: Array, required: true, doc: true},
	},
	computed: {
		itemsMap: (t) => t.items.map(x => ({...x,
			value: x[t._options.value],
			label: x[t._options.label]
		})),

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
