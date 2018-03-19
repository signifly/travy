<template>
	<div class="view">
		<breadcrumb :items="breadcrumb"/>
		<mainView v-bind="{id, meta}" :key="key" />
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import mainView from "@/components/view/main.vue";

export default {
	components: {breadcrumb, mainView},
	computed: {
		id: (t) => t.$route.params.id,
		meta: (t) => t.$route.meta,
		breadcrumb: (t) => [
			{to: {name: t.meta.id}, title: t.meta.id},
			{title: t.id}
		],

		// don't rerender view on sequential batch
		key: (t) => t.$route.query.seq ? null : `${t.meta.id}-${t.id}`
	}
};
</script>
