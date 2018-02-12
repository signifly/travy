<template>
	<vPanel>
		<div class="text">There's unsaved changes</div>
		<div class="actions">
			<Button size="medium" type="primary" v-bind="{loading}" @click="save">Save changes</Button>
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
			this.$parent.$emit("save");
		}
	}
};
</script>

<style lang="scss" scoped>
.text {
	font-size: em(14);
	color: $blue4;
}
</style>
