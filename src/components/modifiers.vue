<template>
	<div class="modifiers">
		<div class="modifiers-field" v-for="field in fields" :key="field.name">
			<div class="label" v-text="field.label"/>
			<field
				label=""
				v-bind="[field, {alt: {data: dataComb}}]"
				@event="event"
			/>
		</div>
	</div>
</template>

<script>
import field from "./field";

export default {
	components: {field},
	props: {
		data: {type: Object, required: true},
		fields: {type: Array, required: true},
		query: {type: Object, required: true}
	},
	computed: {
		dataComb: (t) => ({...t.data, ...t.queryData}),
		queryData: (t) => t.query.modifiers,
	},
	methods: {
		event({actions, done}) {
			const {data} = actions.update;
			this.$emit("update", {modifiers: {...this.queryData, ...data}});
			if (done) done();
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
		display: flex;
		align-items: center;
		margin: -$fieldMargin 0;
		margin-left: 1em;

		.label {
			margin-right: 1em;
			font-size: 0.875em;
			color: $blue4;
		}
	}
}
</style>
