<template>
	<div class="select">
		<Select v-model="data.value" @change="update" v-bind="{size, disabled}" :clearable="_clearable" filterable>
			<Option v-for="option in listMap" v-bind="option" :key="option.value">
				<div class="option">
					<div class="icon" v-if="option.icon && icon(option.icon)"><img :src="icon(option.icon)"></div>
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
				value: "selectValue",
				list: "selectOptions",
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
						value: "UK"
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
		disabled: {type: Boolean, required: false},
		meta: {type: Object, require: false, default: () => ({})},
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_options: {type: Object, required: true, doc: true},
		value: {type: [String, Number], required: false, doc: true},
		_value: {type: String, required: true},
		list: {type: Array, required: true, doc: true},
	},
	data() {
		return {
			data: {
				value: this.value
			}
		}
	},
	computed: {
		nodata: (t) => !t.data.value,
		oLabel: (t) => t._options.label,
		oValue: (t) => t._options.value,

		listMap: (t) => t.list.map(x => ({
			label: x[t.oLabel],
			value: x[t.oValue],
			disabled: x.disabled,
			icon: x.icon
		})),

		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return "medium";
		}
	},
	methods: {
		icon(file) {
			try {
				return require(`!file-loader!@/assets/icons/${file}.svg`);
			} catch(err) {
				console.log(err);
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

		/deep/ {
			.el-input__inner {
				// border: 0;
			}
		}
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
