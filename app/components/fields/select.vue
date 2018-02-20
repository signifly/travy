<template>
	<div class="select">
		<Select v-model="val" @change="update" v-bind="{size}" filterable>
			<Option v-for="option in options" v-bind="option" :key="option.value">
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
				options: "selectOptions"
			},
			data: {
				selectValue: "",
				selectOptions: [
					{
						label: "Danmark",
						icon: "flags/dk",
						value: "dk"
					},
					{
						label: "England",
						icon: "flags/gb",
						value: "UK"
					},
					{
						label: "Murica",
						icon: "flags/us",
						disabled: true,
						value: "US",
					}
				]
			}
		}
	},
	props: {
		meta: {type: Object, require: false, default: () => ({})},
		options: {type: Array, required: true, doc: true},
		value: {type: [String, Number], required: false, doc: true},
		_value: {type: String, required: true}
	},
	data() {
		return {
			val: this.value
		}
	},
	computed: {
		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
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

		update(val) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._value]: val}
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
