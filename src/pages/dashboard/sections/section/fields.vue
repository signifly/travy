<template>
	<box>
		<div class="fields">
			<div class="title" v-text="title"/>

			<div class="fields-list">
				<field
					v-for="field in fields"
					v-bind="[field, {alt: fieldAlt}]"
					:key="field.name"
				/>
			</div>
		</div>
	</box>
</template>

<script>
import field from "@/components/field";
import box from "@/components/box";

export default {
	components: {field, box},
	props: {
		title: {type: Object, required: true},
		fields: {type: Array, required: true},
		endpoint: {type: Object, required: true}
	},
	data() {
		return {
			options: null,
			data: null
		}
	},
	computed: {
		fieldAlt: (t) => ({
			options: t.options,
			data: t.data
		})
	},
	methods: {
		async getData() {
			const {data: {data, options}} = await this.$axios.get(this.endpoint.url, {
				params: this.endpoint.params
			});

			this.options = options;
			this.data = data;
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.fields {
	padding: 1.5em;

	.title {
		margin-bottom: 1em;
	}

	.fields-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
