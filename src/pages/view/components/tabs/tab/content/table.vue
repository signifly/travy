<template>
	<tablePage v-bind="{defsEndpoint: endpoint, title, parentData}" @fieldA="$emit('fieldA', $event)"/>
</template>

<script>
import tablePage from "@/pages/table/page";

export default {
	components: {tablePage},
	props: {
		parentData: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		title: {type: Object, required: true}
	}
};
</script>
