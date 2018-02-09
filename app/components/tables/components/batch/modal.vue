<template>
	<Dialog :title="title" :visible.sync="open" width="500px">
		<div class="modal">
			<field v-for="field in fields" v-bind="field" :data="data" :key="field.type" @fieldA="fieldA" />
		</div>

		<div class="buttons" slot="footer">
			<Button size="medium" type="info" plain :disabled="loading" @click="close">Cancel</Button>
			<Button size="medium" type="primary" :loading="loading" @click="save">Apply</Button>
		</div>
	</Dialog>
</template>

<script>
import {forEach, set} from "lodash";
import {Dialog, Button} from "element-ui";
import field from "@/components/field.vue";

export default {
	components: {Dialog, Button, field},
	props: {
		endpoints: {type: Object, required: true},
		active: {type: Boolean, required: true},
		fields: {type: Array, required: true},
		title: {type: String, required: true},
		data: {type: Object, required: false}
	},
	data() {
		return {
			loading: false,
			payload: {}
		}
	},
	computed: {
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
		},

		close() {
			this.open = false;
		},

		save() {
			this.loading = true;

			this.$emit("save", {
				data: this.payload,
				done: () => {
					this.loading = false;
					this.close();
				}
			})
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
