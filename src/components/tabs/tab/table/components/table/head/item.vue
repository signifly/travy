<template>
	<th class="item" :width="width && `${width}%`">
		{{ name }}
	</th>
</template>

<script>
export default {
	props: {
		name: {type: String, required: true},
		width: {type: Number, required: false},
		onClick: {type: String, required: false},
		fieldType: {type: Object, required: true}
	}
};
</script>

<style lang="scss" scoped>
.item {
	padding: 1em 10px;
	color: #5e6d82;
}
</style>
