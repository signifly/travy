<template>
	<div class="fields">
		<div class="title">Fields</div>

		<div class="main">
			<div class="sidebar">
				<div class="title">Index</div>
				<a v-for="(field, key) in fields" class="link" :href="`#${key}`">{{key}}</a>
			</div>

			<div class="items">
				<vItem v-for="(field, key) in fields" :key="key" :id="key" :props="field.props" v-bind="field.meta" />
			</div>
		</div>
	</div>
</template>

<script>
import * as fields from "@/components/fields";
import vItem from "./item.vue";

export default {
	components: {vItem},
	data() {
		return {
			fields
		}
	}
};
</script>

<style lang="scss" scoped>
.fields {
	> .title {
		font-size: 1.8em;
	}

	.main {
		display: flex;

		.sidebar {
			position: sticky;
			display: table;
			margin-right: 5em;
			padding-top: 3em;
			top: 0;
			left: 0;

			.title {
				font-size: 1.25em;
				margin-bottom: 1em;
			}
			.link {
				font-size: 0.9em;
				display: block;
				margin: 0.5em 0;
				color: $black1;
				text-decoration: none;

				&:hover {
					color: $blue5;
				}
			}
		}
	}
}
</style>
