<template>
	<vPage title="Fields" :sidebar="sidebar">
		<section class="intro content" v-html="intro"/>

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
			fields,
			intro: require("./intro.md")
		}
	},
	computed: {
		fieldsSorted() {
			const fields = Object.keys(this.fields).map(key => {
				return {key, comp: this.fields[key]};
			});

			return sortBy(fields, "key");
		},

		sidebar() {
			const array = [
				{value: "introduction", label: "Introduction"},
				{break: true},
			];

			const fields = this.fieldsSorted.map(x => ({
				value: x.key,
				label: x.key
			}));

			return [...array, ...fields];
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
