<template>
	<Dialog :title="title" :visible.sync="open" width="500px">
		<div class="fields">
			<field v-for="field in fields" v-bind="field" :errors="error.errors" :data="data" :key="field.name" @fieldA="fieldA" />
		</div>

		<component
			v-if="comps[type]"
			:is="type"
			v-bind="{payload, endpoints}"
			:error.sync="error"
			slot="footer"
		/>
	</Dialog>
</template>

<script>
import {forEach, set} from "lodash";
import {Dialog, Button} from "element-ui";
import field from "@/components/field.vue";
import * as types from "./types";

export default {
	components: {Dialog, Button, field, ...types},
	props: {
		endpoints: {type: Object, required: true},
		active: {type: Boolean, required: true},
		fields: {type: Array, required: true},
		type: {type: String, required: true},
		title: {type: String, required: true},
		data: {type: Object, required: false}
	},
	data() {
		return {
			error: {},
			payload: {}
		}
	},
	computed: {
		comps: (t) => t.$options.components,
		open: {
			get() {
				return this.active;
			},
			set(bool) {
				this.$emit("update:active", bool);
			}
		}
	},
	methods: {
		fieldA({data}) {
			forEach(data, (val, key) => set(this.payload, key, val));
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ {
	.el-dialog__title {
		font-weight: 600;
	}
}
</style>
