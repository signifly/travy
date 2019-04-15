<template>
	<modifiers v-bind="[modifiers, {query}]" @update="update" />
</template>

<script>
import modifiers from "@/components/modifiers";

export default {
	components: {modifiers},
	props: {
		modifiers: {type: Object, required: true}
	},
	computed: {
		query: (t) => t.$route.query
	},
	methods: {
		update({modifiers}) {
			this.$router.replace({
				query: {
					...this.query,
					modifiers
				}
			});

			this.$emit("event", {
				actions: {
					refresh: {
						definitions: true,
						data: true
					}
				}
			});
		}
	}
};
</script>
