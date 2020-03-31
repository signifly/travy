<template>
	<div class="fields">
		<field
			v-for="field in fields"
			:key="field.attribute"
			:hide="['label']"
			v-bind="{field}"
			:data="__data"
		/>
	</div>
</template>

<script>
import field from "@/components/field";

export default {
	components: {field},
	meta: {
		spec: {
			fields: {type: Array, required: true}
		},
		res: {
			props: {
				fields: [
					{
						name: "text1",
						attribute: "text1",
						width: 50,
						fieldType: {
							id: "text",
							props: {
								text: "text1"
							}
						}
					},
					{
						name: "text2",
						attribute: "text2",
						fieldType: {
							id: "text",
							props: {
								text: "text2"
							}
						}
					}
				]
			}
		}
	},
	props: {
		__props: {type: Object, required: true},
		__data: {type: Object, required: true}
	},
	computed: {
		fields: (t) => t.__props.fields
	}
};
</script>

<style lang="scss" scoped>
.fields {
	flex-wrap: wrap;
	margin: -3px 0;
	display: flex;

	.field {
		margin: 3px;
	}
}
</style>
