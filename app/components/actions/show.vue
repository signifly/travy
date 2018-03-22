<template>
	<div class="show"></div>
</template>

<script>
import {endpointUrl} from "@/modules/utils";

export default {
	props: {
		alt: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		data: {type: Object, required: false}
	},
	computed: {
		dataComb: (t) => ({...t.alt.data, ...t.data}),
		endpointUrl: (t) => endpointUrl({data: t.dataComb, url: t.endpoint.url})
	},
	created() {
		this.$router.push({path: `/${this.endpointUrl}`, query: {modifiers: this.$route.query.modifiers}});
	}
};
</script>
