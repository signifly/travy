<template>
	<tablePage v-bind="{defsEndpoint: endpoint, title, parentData}"/>
</template>

<script>
import tablePage from "@/pages/table/page";

export default {
	components: {tablePage},
	props: {
		parentData: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		title: {type: String, required: true}
	}
};
</script>
