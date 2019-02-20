<template>
	<div class="input" @keypress="validate">
		<InputNumber
			v-model="valueC"
			:disabled="_disabled"
			:precision="_precision"
			:step="_step"
			:max="_max"
			:controls="true"
			size="medium"
			@input="update"
		/>
	</div>
</template>

<script>
import {toNumber, debounce} from "lodash";
import {InputNumber} from "element-ui";

export default {
	components: {InputNumber},
	meta: {
		res: {
			props: {
				disabled: false,
				value: "inputVal",
				precision: 2,
				step: 0.1,
				max: 10
			},
			data: {
				inputVal: 3.20
			}
		}
	},
	props: {
		alt: {type: Object, required: true},
		_disabled: {type: Boolean, required: false, doc: true},
		_precision: {type: Number, required: true, doc: true},
		_step: {type: Number, required: true, doc: true},
		_max: {type: Number, required: true, doc: true},
		value: {type: Number, required: false, doc: true},
		_value: {type: String, required: true},
	},
	data() {
		return {
			valueC: this.value,
			ready: false
		}
	},
	computed: {
		wait: (t) => t.alt.type === "table" ? 500 : 0
	},
	methods: {
		validate(e) {
			if (e.key === ".") return;
			if (isNaN(toNumber(e.key))) e.preventDefault();
		},
		update(value) {
			if (!this.ready) return;

			this.$emit("fieldA", {
				action: "update",
				data: {[this._value]: value}
			});
		}
	},
	created() {
		this.update = debounce(this.update, this.wait);
	},
	mounted() {
		// prevent update emit on init
		setTimeout(() => {this.ready = true}, 100);
	}
};
</script>

<style lang="scss" scoped>
.input {
	position: relative;
	.el-input-number {
		width: 100%;
	}
}
</style>
