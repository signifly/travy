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
import "./api";

const fields = (() => {
	const ctx = require.context('@/components/fields', false, /\.vue$/);
	return ctx.keys().map((file) => ({
		name: file.replace("./", "").replace(".vue", ""),
		comp: ctx(file).default
	}));
})();

export default {
	components: {layout, vItem},
	computed: {
		fieldsSorted() {
			return sortBy(fields, "name");
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
