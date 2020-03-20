<template>
	<th class="item" :width="width && `${width}%`">
		{{ name }}
	</th>
</template>

<script>
export default {
	props: {
		fieldType: {type: Object, required: true},
		onClick: {type: String, required: false},
		width: {type: Number, required: false},
		name: {type: String, required: true}
	}
};
</script>

<style lang="scss" scoped>
.item {
	padding: 1em 10px;
	color: #5e6d82;
}
</style>
