<template>
	<layout v-bind="{sidebar}">
		<section class="intro html" v-html="require('./intro.md')"/>

		<div class="items">
			<vItem v-for="field in fieldsSorted" :key="field.name" :id="field.name" :props="field.comp.props" v-bind="field.comp.meta"/>
		</div>
	</layout>
</template>

<script>
import layout from "@/pages/meta/layout.vue";
import vItem from "./item.vue";
import {sortBy} from "lodash";

const fields = (() => {
	const ctx = require.context("@/components/fields", false, /\.vue$/);

	return ctx.keys().reduce((obj, file) => {
		const name = file.replace("./", "").replace(".vue", "");
		const comp = ctx(file).default;
		return {...obj, [name]: comp};
	}, {});
})();


export default {
	components: {layout, vItem},
	computed: {
		fieldsSorted() {
			const array = Object.entries({...fields, ...this.$settings.fields}).map(([name, comp]) => ({name, comp}));
			return sortBy(array, "name");
		},

		sidebar: (t) => ({
			title: "Fields",
			sections: [
				[{value: "introduction", label: "Introduction"}],
				t.fieldsSorted.map(x => ({value: x.name, label: x.name}))
			]
		})
	}
};
</script>

<style lang="scss" scoped>

</style>
