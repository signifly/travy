<template>
	<div class="fields">
		<section class="intro html" v-html="require('./intro.md')" />

		<div class="items">
			<vItem
				v-for="field in fieldsSorted"
				:key="field.name"
				:id="field.name"
				:props="field.comp.props"
				v-bind="field.comp.meta"
			/>
		</div>
	</div>
</template>

<script>
import vItem from "./item.vue";
import {sortBy} from "lodash";
import Vue from "vue";

const fields = (() => {
	if (Vue.prototype.$settings.test) return {};
	const ctx = require.context("@/components/fields", false, /\.vue$/);

	return ctx.keys().reduce((obj, file) => {
		const name = file.replace("./", "").replace(".vue", "");
		const comp = ctx(file).default;
		return {...obj, [name]: comp};
	}, {});
})();

export default {
	components: {vItem},
	computed: {
		fieldsSorted() {
			const array = Object.entries({...fields, ...this.$settings.fields}).map(
				([name, comp]) => ({name, comp})
			);
			return sortBy(array, "name");
		}
	},
	created() {
		this.$emit("sidebar", {
			title: "Fields",
			sections: [
				[{value: "introduction", label: "Introduction"}],
				this.fieldsSorted.map((x) => ({value: x.name, label: x.name}))
			]
		});
	}
};
</script>

<style lang="scss" scoped></style>
