<template>
	<div class="select-multi">
		<Select v-model="data.values" @change="update" v-bind="{size}" :disabled="_disabled" :clearable="_clearable" filterable multiple allow-create>
			<Option v-for="option in listMap" v-bind="option" :key="option.value" />
		</Select>
	</div>
</template>

<script>
import selectMulti from "./input-select-multi.vue";
export default {...selectMulti};
</script>
