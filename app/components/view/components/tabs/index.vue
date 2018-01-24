<template>
	<div class="tabs">
		<tabs v-bind="{tabs}">
			<template slot="label" slot-scope="item">{{item.label}}</template>
			<template slot="content" slot-scope="page">
				<page v-bind="{page, data}" @update="$emit('update', $event)"/>
			</template>
		</tabs>
	</div>
</template>

<script>
import tabs from "@/components/tabs.vue";
import page from "./page.vue";

export default {
	components: {tabs, page},
	props: {
		tabs: {type: Array, required: true},
		data: {type: Object, required: true}
	}
};
</script>

<style lang="scss" scoped>
.tabs {

}
</style>
