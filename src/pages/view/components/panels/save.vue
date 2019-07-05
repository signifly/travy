<template>
	<vPanel>
		<div class="text">
			{{
				$translate({
					en: "There are unsaved changes",
					da: "Der er ikke gemte ændringer"
				})
			}}
		</div>
		<div class="actions">
			<div class="error" v-if="errorMsg" v-text="errorMsg" />

			<Button
				size="medium"
				type="primary"
				v-bind="{loading}"
				@click="save"
				v-shortkey="{win: ['ctrl', 's'], mac: ['meta', 's']}"
				@shortkey.native="save"
				title="CTRL/CMD + S"
			>
				{{ $translate({en: "Save changes", da: "Gem ændringer"}) }}
			</Button>
		</div>
	</vPanel>
</template>

<script>
import {Button} from "element-ui";
import vPanel from "@/components/panel.vue";

export default {
	components: {Button, vPanel},
	props: {
		loading: {type: Boolean, required: true},
		errorMsg: {type: String, required: true}
	},
	methods: {
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
