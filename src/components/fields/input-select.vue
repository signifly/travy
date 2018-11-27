<template>
	<div class="select">
		<Select
			:value="value"
			v-bind="{size, clearable, disabled}"
			@change="update"
			filterable
		>
			<Option v-for="option in itemsMap" v-bind="option" :key="option.value">
				<div class="option">
					<div class="icon" v-if="icon(option.icon)">
						<img :src="icon(option.icon)">
					</div>
					{{option.label}}
				</div>
			</Option>
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

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
						icon: "flags/dk",
						id: "DK"
					},
					{
						name: "England",
						icon: "flags/gb",
						id: "UK"
					},
					{
						name: "Murica",
						icon: "flags/us",
						disabled: true,
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
		clearable: (t) => t._clearable,
		disabled: (t) => t._disabled,

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
		icon(file) {
			if (file) {
				try {
					return require(`!file-loader!@/assets/icons/${file}.svg`);
				} catch(err) {
					console.log(err);
				}
			}
		},

		update(value) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._value]: value}
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

	.icon {
		display: flex;
		align-items: center;
		width: 1.2em;
		margin-right: 0.75em;
	}
}
</style>
