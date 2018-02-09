<template>
	<div class="filters">

		<Popover popper-class="pop" v-model="active" ref="pop" placement="bottom-end" width="300" transition="trans-fadeDown">
			<div class="fields">
				<field v-for="field in fields" :key="field.name" v-bind="field" :data="data" @fieldA="update" />
			</div>
		</Popover>

		<Input
		class="search"
		:class="{active}"
		size="medium"
		:prefix-icon="searchIcon"
		v-model="input"
		:placeholder="search.placeholder"
		@input="updateSearchQ"
		clearable>
			<Button slot="append" icon="el-icon-tickets" v-if="fields" v-popover:pop>Add filter</Button>
		</Input>

	</div>
</template>

<script>
import {mapValues, mapKeys, debounce, get} from "lodash";
import {Input, Button, Popover} from "element-ui";
import field from "@/components/field.vue";

export default {
	components: {Input, Button, Popover, field},
	props: {
		filters: {type: Object, required: true},
		search: {type: Object, required: true},
		getData: {type: Function, required: true}
	},
	data() {
		return  {
			input: get(this.$route.query, "filters.q") || "",
			loading: false,
			active: false
		}
	},
	computed: {
		searchIcon: (t) => t.loading ? "el-icon-loading": "el-icon-search",
		components: (t) => t.$options.components,
		fields: (t) => t.filters.fields,
		data: (t) => ({...t.filters.data, ...t.query.filters}),
		query: (t) => t.$route.query

	},
	methods: {
		async update({data}) {
			this.loading = true;

			const filters = {...this.query.filters, ...data};
			this.$router.replace({query: {...this.query, filters}});
			await this.getData();
			this.loading = false;
		},

		updateSearch: debounce(async function(input) {
			this.$router.replace({query: {...this.query, filters: {...this.query.filters, q: input}}});
			await this.getData();
			this.loading = false;
		}, 500),

		updateSearchQ(data) {
			this.loading = true;
			this.updateSearch(data);
		}
	}
};
</script>

<style lang="scss" scoped>
.fields {
	zoom: 95%;
	padding: 0.5em;
	padding-bottom: 0;
}

.filters {
	position: relative;

	.search {
		/deep/ {
			.el-input__inner {
				width: em(284);
			}

			.el-input-group__append {
				background-color: $white1;
				transition: cubic(background-color);
			}

			.el-input__prefix {
				.el-icon-loading {
					color: $blue5;
				}
			}
		}

		&.active {
			/deep/ {
				.el-input-group__append {
					background-color: $blue4;
					color: $white1;
				}
			}
		}
	}
}
</style>
