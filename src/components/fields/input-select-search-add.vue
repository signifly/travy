<template>
	<div class="select-search">
		<Select
		@change="update"
		v-bind="{value, size}"
		:remote-method="getItems"
		:disabled="_disabled"
		:clearable="_clearable"
		@visible-change="open"
		:filterable="true"
		:remote="true"
		:allow-create="true">

			<Option v-for="item in itemsC" :key="item.value" v-bind="item"/>

		</Select>
	</div>
</template>

<script>
import selectSearch from "./input-select-search.vue";
export default {...selectSearch};
</script>
