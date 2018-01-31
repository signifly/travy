<template>
	<component :is="link ? 'router-link' : 'div'" class="field" :to="link">
		<component
			v-if="components[id]"
			:is="id"
			:meta="{location: 'table'}"
			:props="props"
			v-bind="propsData"
			@update="update"
			@remove="remove"
			@show="show"
		/>
	</component>
</template>

<script>
import {mapValues, omit, get} from "lodash";
import * as fields from "@/components/fields";

export default {
	components: {...fields},
	props: {
		column: {type: Object, required: true},
		scope: {type: Object, required: true},
		modifiers: {type: Array, required: true},
		endpoints: {type: Object, required: true}
	},
	computed: {
		components: (t) => t.$options.components,
		id: (t) => t.column.fieldType.id,
		item: (t) => t.scope.row,
		action: (t) => t.column.fieldType.action,
		props: (t) => t.column.fieldType.props,
		propsData: (t) => mapValues(t.props, (key) => get(t.item, key)),

		link() {
			if (!this.action) return;
			const split = this.action.split("/");

			return split.map(item => {
				const start = item.indexOf("{");
				const end = item.indexOf("}");
				if (start === -1 && end === -1) return item;

				const key = item.substring(start + 1, end);

				return get(this.item, key);
			}).join("/");
		}
	},
	methods: {
		endpoint({type}) {
			const endpoint = this.endpoints[type];

			if (endpoint.url.includes("{id}")) {
				const id = this.item[endpoint.id];
				if (!id) throw new Error(`missing ${endpoint.id} on item ${this.item.id}`);

				return endpoint.url.replace("{id}", id);
			} else {
				return endpoint.url;
			}
		},

		show() {
			const url = this.endpoint({type: "show"});
			this.$router.push(`/${url}`);
		},

		async update({data, done}) {
			try {
				const modifiers = this.modifiers.map(x => omit(x, "options"));
				const url = this.endpoint({type: "update"});
				await this.$http.put(url, {data, modifiers});
			} catch (err) {
				console.log(err);
			} finally {
				if (done) done();
			}
		},

		async remove({done}) {
			try {
				const url = this.endpoint({type: "destroy"});
				await this.$http.delete(url);
				await this.getData();
			} catch (err) {
				console.log(err);
			} finally {
				if (done) done();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.field {
	text-decoration: none;
	color: $black1;
}
</style>
