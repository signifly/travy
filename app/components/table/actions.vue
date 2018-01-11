<template>
	<div class="actions">
		<Button
		v-for="a in actions"
		:type="a.status"
		:key="a.title"
		:icon="`el-icon-${a.icon}`"
		size="medium">
			{{a.title}}
		</Button>
	</div>
</template>

<script>
import {Button} from "element-ui";

export default {
	components: {Button},
	props: {
		actions: {type: Array, required: true}
	}
};
</script>

<style lang="scss" scoped>
.actions {

}
</style>
