<template>
	<a class="label" :class="{active}" @click="set">
		{{ name }}
	</a>
</template>
<script>
export default {
	props: {
		id: {type: String, required: true},
		name: {type: String, required: true},
		active: {type: Boolean, required: true}
	},
	computed: {
		query: (t) => t.$route.query
	},
	methods: {
		set() {
			if (this.query.tab !== this.id) {
				this.$router.replace({
					path: this.$route.path,
					query: {
						modifiers: this.query.modifiers,
						tab: this.id
					}
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.label {
	display: inline-flex;
	align-items: center;
	user-select: none;
	margin-left: 24px;
	height: 100%;

	&.active {
		border-bottom: 2px solid #24b0d5;
	}
}
</style>
