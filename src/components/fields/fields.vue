<template>
	<div class="fields">
		<field
			:hide="['description', 'label']"
			v-bind="{field, error, data}"
			v-for="(field, i) in fields"
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
		__error: {type: Object, required: false},
		__props: {type: Object, required: true},
		__data: {type: Object, required: true}
	},
	computed: {
		fields: (t) => t.__props.fields,
		error: (t) => t.__error,
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
