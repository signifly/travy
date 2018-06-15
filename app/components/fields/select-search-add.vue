<template>
	<div class="select-search">
		<Select
		v-model="data.value"
		@change="update"
		v-bind="{size: sizeMap, loading}"
		:remote-method="getListQ"
		:disabled="_disabled"
		:clearable="_clearable"
		filterable remote reserve-keyword allow-create>
			<Option v-for="item in listMap" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {vSelectSearch} from "./index";
export default {...vSelectSearch};
</script>
