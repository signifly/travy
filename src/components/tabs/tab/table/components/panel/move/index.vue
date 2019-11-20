<template>
	<div class="move">
		<Popover placement="top" width="300" ref="popover">
			<popover @close="close" />
			<Button size="medium" slot="reference">
				Move
				<i class="el-icon-d-caret el-icon-right" />
			</Button>
		</Popover>
	</div>
</template>

<script>
import {Popover, Button} from "element-ui";
import popover from "./popover";

export default {
	components: {popover, Popover, Button},
	props: {
		sort: {type: Object, required: true}
	},
	methods: {
		close() {
			this.$refs.popover.showPopper = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.move {
	display: flex;
	align-items: center;
}
</style>
