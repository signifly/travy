<template>
	<div class="header">
		<div class="loading"><i class="el-icon-loading" v-if="loading" /></div>
		<Button size="mini" icon="el-icon-check" plain @click="itemsRead">
			{{ $translate({en: "Mark all as read", da: "Markér alle som læst"}) }}
		</Button>
	</div>
</template>

<script>
import {Button} from "element-ui";

export default {
	components: {Button},
	props: {
		loading: {type: Boolean, required: true}
	},
	methods: {
		async itemsRead() {
			await this.$axios.post("account/notifications", {data: {all: true}});
			this.$emit("itemsRead");
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	padding: 1em;
	display: flex;
	border-bottom: 2px solid $blue5;
	justify-content: space-between;
	align-items: center;
	flex-shrink: 0;

	.loading {
		color: $blue5;
	}
}
</style>
