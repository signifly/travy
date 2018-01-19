<template>
	<div class="basic">
		{{label}}
	</div>
</template>

<script>
export default {
	props: {
		label: {type: String, required: true},
		endpoint: {type: String, required: true}
	}
};
</script>
