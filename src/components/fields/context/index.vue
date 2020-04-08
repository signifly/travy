<template>
	<contextView
		v-bind="{endpoint, fields, error}"
		@event="$emit('event', $event)"
		:parentData="data"
		:key="attribute"
	/>
</template>

<script>
import contextView from "./view";

export default {
	components: {contextView},
	meta: {
		spec: {
			fields: {type: Array, required: true, note: "fields can't update data."},
			attribute: {
				note: "If the attribute changes, the context field reloads.",
				type: [String, Number],
				required: false
			},
			endpoint: {
				type: Object,
				required: true,
				children: {
					url: {type: String, required: true},
					params: {type: Object, required: false}
				}
			}
		},
		res: {
			props: {
				endpoint: {
					url: "items/1",
					params: {}
				},
				fields: [
					{
						name: "text1",
						fieldType: {
							id: "text",
							props: {
								text: "id is: {id}"
							}
						}
					},
					{
						name: "text2",
						fieldType: {
							id: "text",
							props: {
								text: "parent id is: {$parent.id}"
							}
						}
					}
				]
			},
			data: {
				id: 2
			}
		}
	},
	props: {
		attribute: {type: [String, Number], required: false},
		endpoint: {type: Object, required: true},
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
