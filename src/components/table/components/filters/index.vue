<template>
	<div class="filters">
		<Popover
			popper-class="pop"
			v-model="active"
			ref="pop"
			placement="bottom-end"
			width="300"
			transition="trans-fadeDown"
		>
			<div class="pop">
				<div class="fields">
					<field
						v-for="field in fields"
						:key="field.name"
						v-bind="field"
						:alt="{data: dataComb}"
						@event="event"
					/>
				</div>

				<div class="reset">
					<Button
						plain
						size="mini"
						type="info"
						icon="el-icon-refresh"
						@click="reset"
					>
						{{ $translate({en: "Reset", da: "Nulstil"}) }}
					</Button>
				</div>
			</div>
		</Popover>

		<Input
			v-if="search"
			class="search"
			:class="{active}"
			size="medium"
			v-model="input"
			:prefix-icon="searchIcon"
			:placeholder="search.placeholder"
			@input="update({data: {search: $event}})"
			clearable
		>
			<Button
				slot="append"
				icon="el-icon-tickets"
				v-if="fields && fields.length > 0"
				v-popover:pop
			>
				Filter
			</Button>
		</Input>
	</div>
</template>

<script>
import {mapValues, debounce, get} from "lodash";
import {Input, Button, Popover} from "element-ui";
import field from "@/components/field";
import state from "../../state";

export default {
	components: {Input, Button, Popover, field},
	props: {
		data: {type: Object, default: () => ({})},
		search: {type: Object, required: false},
		fields: {type: Array, required: false}
	},
	data() {
		return {
			input: get(this.$route.query, "filters.search") || "",
			loading: false,
			active: false
		};
	},
	computed: {
		searchIcon: (t) => (t.loading ? "el-icon-loading" : "el-icon-search"),
		dataComb: (t) => ({...t.data, ...t.query.filters}),
		components: (t) => t.$options.components,
		query: () => state.query
	},
	methods: {
		updateDebounce: debounce(function() {
			this.$emit("filter", {
				done: async () => (this.loading = false)
			});
		}, 1000),

		update({data}) {
			this.loading = true;

			let filters = {...this.query.filters, ...data};
			filters = mapValues(filters, (val) => (val === "" ? undefined : val));

			state.mergeQuery({
				type: "replace",
				query: {
					page: undefined,
					filters
				}
			});

			this.updateDebounce();
		},

		async event({actions, done}) {
			const {update} = actions;
			if (update) this.update({data: update.data});
			if (done) await done();
		},

		async reset() {
			this.loading = true;
			this.active = false;
			const filters = this.input ? {search: this.input} : undefined;

			state.setQuery({
				type: "replace",
				query: {
					...this.query,
					filters
				}
			});

			this.$emit("filter", {
				done: async () => (this.loading = false)
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pop {
	margin-top: -1.5em;
	padding: 0.75em;

	.reset {
		margin-top: 1.5em;
	}
}

.filters {
	position: relative;

	.search {
		::v-deep {
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
			::v-deep {
				.el-input-group__append {
					background-color: $blue4;
					color: $white1;
				}
			}
		}
	}
}
</style>
