<template>
	<div class="context-view" v-if="data">
		<field
			v-bind="{field, options, data, error}"
			@event="$emit('event', $event)"
			v-for="(field, i) in fields"
			:key="i"
		/>
	</div>
</template>

<script>
import {transProps} from "@/modules/utils";
import field from "@/components/field";

export default {
	components: {field},
	props: {
		parentData: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		error: {type: Object, required: false},
		fields: {type: Array, required: true}
	},
	data: () => ({
		options: null,
		data: null
	}),
	computed: {
		modifiers: (t) => t.$route.query.modifiers,

		trans() {
			return transProps({
				val: {endpoint: this.endpoint},
				data: this.parentData
			});
		}
	},
	methods: {
		async getData() {
			const {url, params} = this.trans.endpoint;

			const {data: res} = await this.$axios.get(url, {
				params: {...params, modifier: this.modifiers}
			});

			this.options = res.options;
			this.data = {...res.data, $parent: this.parentData};
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.context-view {
	justify-content: space-between;
	margin: -$fieldMargin 0;
	flex-wrap: wrap;
	display: flex;
}
</style>
