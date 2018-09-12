<template>
	<vPage v-bind="{sidebar}">
		<section class="intro html" v-html="require('./intro.md')"/>

		<div class="items">
			<vItem v-for="field in fieldsSorted" :key="field.key" :id="field.key" :props="field.comp.props" v-bind="field.comp.meta" />
		</div>
	</vPage>
</template>

<script>
import {sortBy} from "lodash";
import * as fields from "@/components/fields";
import vItem from "./item.vue";
import vPage from "../page.vue";

export default {
	components: {vPage, vItem},
	data() {
		return {
			fields
		}
	},
	computed: {
		fieldsSorted() {
			const fields = Object.keys(this.fields).map(key => ({key, comp: this.fields[key]}));
			return sortBy(fields, "key");
		},

		sidebar: (t) => ({
			title: "Fields",
			sections: [
				[{value: "introduction", label: "Introduction"}],
				t.fieldsSorted.map(x => ({value: x.key, label: x.key}))
			]
		})
	}
};
</script>

<style lang="scss" scoped>

</style>
