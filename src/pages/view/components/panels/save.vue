<template>
	<vPanel>
		<div class="text">There are unsaved changes</div>
		<div class="actions">
			<!-- <div class="error" v-if="error.message">{{error.message}}</div> -->

			<Button
			size="medium"
			type="primary"
			v-bind="{loading}"
			@click="save"
			v-shortkey="{win: ['ctrl', 's'], mac: ['meta', 's']}"
			@shortkey.native="save"
			title="CTRL/CMD + S">
				Save changes
			</Button>

		</div>
	</vPanel>
</template>

<script>
import {Button} from "element-ui";
import vPanel from "@/components/panel.vue";

export default {
	components: {Button, vPanel},
	props: {
		loading: {type: Boolean, required: true}
	},
	methods: {
		save() {
			this.$emit("save");
		}
	}
};
</script>

<style lang="scss" scoped>
.text {
	font-size: em(14);
	color: $blue4;
}

.actions {
	display: flex;
	align-items: center;

	.error {
		font-size: em(12);
		font-weight: 500;
		margin-right: 1em;
		color: $danger;
	}
}
</style>
