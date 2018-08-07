<template>
	<div class="select-multi-search-add">
		<Select
		v-model="data.values"
		v-bind="{size, loading}"
		:remote-method="getListOptionsQ"
		:disabled="_disabled"
		:clearable="_clearable"
		@change="update"
		@visible-change="initSearch"
		filterable multiple remote reserve-keyword allow-create>
			<Option v-for="item in list" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {vSelectMultiSearch} from "./index";
export default {...vSelectMultiSearch};
</script>
