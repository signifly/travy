<template>
	<div class="alert">
		<Alert
			v-bind="{title, description}"
			:closable="false"
			:showIcon="icon"
			:type="status"
		/>
	</div>
</template>

<script>
import {Alert} from "element-ui";

export default {
	components: {Alert},
	meta: {
		spec: "props",
		res: {
			props: {
				title: "Alert"
			}
		}
	},
	props: {
		description: {type: String, required: false},
		status: {type: String, default: "info"},
		icon: {type: Boolean, required: false},
		title: {type: String, required: true}
	}
};
</script>

<style lang="scss" scoped>
.alert {
}
</style>
