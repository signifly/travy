<template>
	<tablePage v-bind="{defsEndpoint: endpoint, title}"/>
</template>

<script>
import tablePage from "@/pages/table/page";

export default {
	components: {tablePage},
	props: {
		endpoint: {type: Object, required: true},
		title: {type: Object, required: true}
	}
};
</script>
