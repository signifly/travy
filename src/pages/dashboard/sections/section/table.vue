<template>
	<tablePage v-bind="{defsEndpoint: endpoint, title}" />
</template>

<script>
import tablePage from "@/components/tabs/tab/table";

export default {
	components: {tablePage},
	props: {
		endpoint: {type: Object, required: true},
		title: {type: Object, required: true}
	}
};
</script>
