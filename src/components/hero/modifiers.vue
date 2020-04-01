<template>
	<div class="modifiers">
		<div class="modifiers-field" v-for="(field, i) in fields" :key="i">
			<field v-bind="{field}" :hide="['label']" :data="dataC" @event="event" />
		</div>
	</div>
</template>

<script>
import field from "../field";

export default {
	components: {field},
	props: {
		fields: {type: Array, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		dataC: (t) => ({...t.data, ...t.query.modifiers}),
		query: (t) => t.$route.query
	},
	methods: {
		event({actions}) {
			if (actions.update) {
				const {data} = actions.update;

				this.$router
					.replace({
						query: {
							tab: this.query.tab,
							modifiers: {
								...this.dataComb,
								...data
							}
						}
					})
					.catch(() => {});

				this.$emit("refresh");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.modifiers {
	display: flex;

	&-field {
		margin: -1em 0 -1em 1em;
		max-width: 200px;
	}
}
</style>
