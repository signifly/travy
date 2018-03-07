<template>
	<div class="action-item">
		<div class="modal" v-if="modal">
			<vModalFields
				v-bind="{fields, error, title, loading}"
				:data="_data"
				:visible.sync="active"
				@submit="submit"
				@fieldA="fieldA"
			/>

			<Button
			:type="status"
			:key="title"
			:icon="`el-icon-${icon}`"
			size="medium"
			@click="toggle">
				{{title}}
			</Button>
		</div>

		<div class="popover" v-if="popover">
			<vPopover :active.sync="active" placement="bottom-end" v-bind="{text, loading}" @submit="submit">
				<Button
				slot="button"
				size="medium"
				:icon="`el-icon-${icon}`"
				:type="status">
					{{title}}
				</Button>
			</vPopover>
		</div>
	</div>
</template>

<script>
import {forEach, get, set} from "lodash";
import {Button, Popover} from "element-ui";
import vModalFields from "@/components/modal-fields.vue";
import vPopover from "@/components/popover.vue";
import {endpoint} from "@/modules/utils";

export default {
	components: {Button, Popover, vModalFields, vPopover},
	props: {
		itemData: {type: [Object, Array], required: false},
		type: {type: String, required: true},
		title: {type: String, required: true},
		text: {type: String, required: false},
		status: {type: String, required: true},
		icon: {type: String, required: true},
		endpoints: {type: Object, required: true},
		fields: {type: Array, required: false},
		title: {type: String, required: true},
		data: {type: Object, required: false}
	},
	data() {
		return {
			_data: this.data,
			loading: false,
			active: false,
			error: {}
		}
	},
	computed: {
		parentId: (t) => t.$route.meta.id,
		modal() {
			if (this.type === "store") return true;
		},
		popover() {
			if (this.type === "delete") return true;
		}
	},
	methods: {
		toggle() {
			this.active = !this.active;
		},

		close() {
			this.active = false;
		},

		fieldA({data}) {
			forEach(data, (val, key) => set(this._data, key, val));
		},

		submit() {
			if (this[this.type]) this[this.type]();
		},

		async store() {
			try {
				this.loading = true;
				const {data} = await this.$http.post(this.endpoints.store.url, {data: this._data}, {custom: true});
				this.$router.push(endpoint({type: "show", item: data.data, endpoints: this.endpoints}));
			} catch ({response}) {
				this.error = get(response, "data", {});
			} finally {
				this.loading = false;
			}
		},

		async delete() {
			const destroy = this.endpoints.destroy;
			const url = endpoint({type: "destroy", item: this.itemData, endpoints: this.endpoints});

			try {
				this.loading = true;
				await this.$http.delete(url);
				this.$router.push(`/${this.parentId}`);
			} catch (e) {} finally {
				this.loading = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.action-item {

}
</style>
