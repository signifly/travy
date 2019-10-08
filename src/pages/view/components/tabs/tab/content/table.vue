<template>
	<tablePage
		v-bind="{defsEndpoint: endpoint, title, parentData}"
		@event="$emit('event', $event)"
	/>
</template>

<script>
import tablePage from "@/components/tabs/tab/table";

export default {
	components: {tablePage},
	props: {
		parentData: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		title: {type: Object, required: true}
	}
};
</script>
