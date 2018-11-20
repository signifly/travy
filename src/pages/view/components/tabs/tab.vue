<template>
	<div class="tab">
		<div class="fields" v-if="tabData">
			<field v-for="field in fields" v-bind="[field, {alt: {data}}]" :key="field.name"/>
		</div>
	</div>
</template>

<script>
import {endpointUrl} from "@/modules/utils";
import field from "@/components/field";

export default {
	components: {field},
	props: {
		endpoint: {type: Object, required: true},
		fields: {type: Array, required: true},
		title: {type: String, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			tabData: null
		}
	},
	computed: {
		endpointUrl: (t) => endpointUrl({data: t.data, url: t.endpoint.url})
	},
	methods: {
		fieldA() {

		},

		async getData() {
			const {data} = await this.$axios.get(this.endpointUrl, {params: this.endpoint.params});
			console.log(data);
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.tab {
	.title {
		margin-bottom: 1.5em;
	}
}
</style>
