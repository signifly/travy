<template>
	<div class="view">
		<breadcrumb :items="breadcrumb"/>
		<mainView v-bind="{id, meta}"/>
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import mainView from "@/components/view/main.vue";

export default {
	components: {breadcrumb, mainView},
	props: {
		id: {type: String, required: true}
	},
	computed: {
		meta: (t) => t.$route.meta,
		breadcrumb: (t) => [
			{to: {name: t.meta.parent.id}, title: t.meta.parent.id},
			{title: t.id}
		]
	}
};
</script>
