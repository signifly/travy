<template>
	<div class="filters">

		<Popover popper-class="pop" v-model="active" ref="pop" placement="bottom-end" width="300" transition="trans-fadeDown">
			<div class="pop">
				<div class="fields" :key="resetU">
					<vField
						v-for="field in fields"
						:key="field.name"
						v-bind="field"
						:alt="{data: dataComb}"
						@fieldA="updateQ"
					/>
				</div>

				<div class="reset">
					<Button
					plain
					size="mini"
					type="info"
					icon="el-icon-refresh"
					@click="reset">
						Reset
					</Button>
				</div>
			</div>
		</Popover>

		<Input
		class="search"
		:class="{active}"
		size="medium"
		:prefix-icon="searchIcon"
		v-model="input"
		:placeholder="search.placeholder"
		@input="updateQ({data: {q: $event}})"
		clearable>
			<Button slot="append" icon="el-icon-tickets" v-if="fields && fields.length > 0" v-popover:pop>Add filter</Button>
		</Input>

	</div>
</template>

<script>
import {mapValues, mapKeys, debounce, get} from "lodash";
import {Input, Button, Popover} from "element-ui";
import vField from "@/components/field/index.vue";

export default {
	components: {Input, Button, Popover},
	props: {
		data: {type: Object, required: false, default: () => ({})},
		fields: {type: Array, required: false},
		search: {type: Object, required: true},
		getData: {type: Function, required: true}
	},
	data() {
		return  {
			input: get(this.$route.query, "filters.q") || "",
			loading: false,
			active: false,
			resetU: 0
		}
	},
	computed: {
		searchIcon: (t) => t.loading ? "el-icon-loading": "el-icon-search",
		dataComb: (t) => ({...t.data, ...t.query.filters}),
		components: (t) => t.$options.components,
		query: (t) => t.$route.query
	},
	methods: {
		update: debounce(async function({data}) {
			let filters = {...this.query.filters, ...data};
			filters = mapValues(filters, (val, key) => val === "" ? undefined : val);

			this.$router.replace({query: {...this.query, page: undefined, filters}});
			await this.getData();
			this.loading = false;
		}, 500),

		updateQ({data}) {
			this.loading = true;
			this.update({data});
		},

		async reset() {
			this.loading = true;
			this.active = false;
			const filters = this.input ? {q: this.input} : undefined;
			this.$router.replace({query: {...this.query, filters}});
			await this.getData();
			this.loading = false;
			this.resetU++;
		}
	},
	beforeCreate() {
		this.$options.components.vField = vField;
	}
};
</script>

<style lang="scss" scoped>
.pop {
	margin-top: -1em;
	padding: 0.25em;
	transform: scale(0.95);

	.reset {
		margin-top: 1.5em;
	}
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
