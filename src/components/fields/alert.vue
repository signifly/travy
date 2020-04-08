<template>
	<div class="alert">
		<Alert
			:description="text"
			:closable="false"
			:showIcon="icon"
			:title="title"
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
		status: {type: String, default: "info"},
		icon: {type: Boolean, required: false},
		text: {type: String, required: false},
		title: {type: String, required: true}
	}
};
</script>

<style lang="scss" scoped>
.alert {
}
</style>
