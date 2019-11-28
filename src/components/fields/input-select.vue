_entities<template>
	<div class="select">
		<Select
			v-bind="{value}"
			:disabled="_disabled"
			:clearable="_clearable"
			:allow-create="_addable"
			:filterable="true"
			@change="update"
		>
			<Option v-for="item in _entities" v-bind="item" :key="item.value">
				{{ item.label }}
			</Option>
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		spec: {
			_clearable: {type: Boolean, required: false, default: true},
			value: {type: [String, Number], required: false},
			_disabled: {type: Boolean, required: false},
			_addable: {type: Boolean, required: false},
			_entities: {
				type: Array,
				required: true,
				children: {
					value: {type: [String, Number], required: true},
					disabled: {type: Boolean, required: false},
					label: {type: String, required: true}
				}
			}
		},
		res: {
			props: {
				_clearable: false,
				_addable: true,
				value: "value",
				_entities: [
					{label: "Danmark", value: "dk"},
					{label: "England", value: "uk"},
					{label: "Murica", value: "us", disabled: true}
				]
			},
			data: {
				value: "uk"
			}
		}
	},
	props: {
		value: {type: [String, Number], required: false},
		_disabled: {type: Boolean, required: false},
		_clearable: {type: Boolean, default: true},
		_addable: {type: Boolean, default: false},
		_entities: {type: Array, required: true}
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
.select {
	.el-select {
		width: 100%;
	}
}

.option {
	display: flex;
	align-content: center;
}
</style>
