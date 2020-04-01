<template>
	<div class="fields">
		<field
			:hide="['description', 'label']"
			v-for="(field, i) in fields"
			v-bind="{field, data}"
			margin="3px 0"
			:key="i"
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
		fields: (t) => t.__props.fields,
		data: (t) => t.__data
	}
};
</script>

<style lang="scss" scoped>
.fields {
	flex-wrap: wrap;
	margin: -3px 0;
	display: flex;
}
</style>
