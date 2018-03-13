<template>
	<div class="show"></div>
</template>

<script>
import {endpointUrl} from "@/modules/utils";

export default {
	props: {
		endpoint: {type: Object, required: true},
		rootData: {type: Object, required: false},
		data: {type: Object, required: false}
	},
	computed: {
		dataComb: (t) => ({...t.rootData, fieldsData: t.data}),
		endpointUrl: (t) => endpointUrl({data: t.dataComb, url: t.endpoint.url})
	},
	created() {
		this.$router.push(this.endpointUrl);
	}
};
</script>
