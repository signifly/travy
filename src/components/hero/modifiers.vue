<template>
	<div class="modifiers">
		<div class="modifiers-field" v-for="field in fields" :key="field.attribute">
			<field
				v-bind="{field, data}"
				:hide="['label']"
				:widthPx="true"
				@event="event"
			/>
		</div>
	</div>
</template>

<script>
import field from "../field";

export default {
	components: {field},
	props: {
		data: {type: Object, required: true},
		fields: {type: Array, required: true}
	},
	computed: {
		dataComb: (t) => ({...t.data, ...t.query.modifiers}),
		query: (t) => t.$route.query
	},
	methods: {
		event({actions}) {
			if (actions.update) {
				const {data} = actions.update;

				this.$router
					.replace({
						query: {
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
	width: 100%;
	max-width: 550px;
	display: flex;
	justify-content: flex-end;

	&-field {
		max-width: 200px;
		margin: -1em 0 -1em 1em;
	}
}
</style>
