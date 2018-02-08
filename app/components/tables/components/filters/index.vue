<template>
	<div class="filters">
		<Input
		class="search"
		:class="{settingsActive: settings}"
		size="medium"
		:prefix-icon="searchIcon"
		v-model="input"
		:placeholder="search.placeholder"
		@input="updateSearchQ"
		clearable>
			<Button v-if="filters.length > 0" slot="append" icon="el-icon-tickets" @click="toggleSettings">Tilføj filter</Button>
		</Input>

		<transition name="settings">
			<div class="settings" v-show="settings">
				<div class="item" v-for="item in filters" v-if="components[item.fieldType.id]">
					<component
						:is="item.fieldType.id"
						:title="item.title"
						v-bind="props(item)"
						@update="update({data: $event, item})"
					/>
				</div>
			</div>
		</transition>

	</div>
</template>

<script>
import {mapValues, mapKeys, debounce, get} from "lodash";
import {Input, Button} from "element-ui";
import {vSwitch, vCheckbox} from "./fields";

export default {
	components: {Input, Button, vSwitch, vCheckbox},
	props: {
		filters: {type: Array, required: true},
		search: {type: Object, required: true},
		getData: {type: Function, required: true}
	},
	data() {
		return  {
			input: get(this.$route.query, "filters.q") || "",
			loading: false,
			settings: false
		}
	},
	computed: {
		components: (t) => t.$options.components,
		query: (t) => t.$route.query,
		searchIcon: (t) => t.loading ? "el-icon-loading": "el-icon-search"
	},
	methods: {
		props({data, fieldType}) {
			return mapValues(fieldType.props, (key) => data[key]);
		},

		toggleSettings() {
			this.settings = !this.settings;
		},

		async update({data, item}) {
			this.loading = true;
			const props = item.fieldType.props;
			data = mapKeys(data, (val, key) => props[key]);

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

		&.settingsActive {
			/deep/ {
				.el-input-group__append {
					background-color: $blue4;
					color: $white1;
				}
			}
		}
	}

	.settings {
		z-index: 1;
		position: absolute;
		top: calc(100% + 0.5em);
		left: 0;
		right: 0;
		box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
		border-radius: 4px;
		background-color: $white1;
		padding: 0.5em 1em;

		.item {
			margin: 1em 0;
		}

		&-enter-active, &-leave-active {
			transition: cubic(opacity), cubic(transform);
		}
		&-enter, &-leave-to {
			opacity: 0;
			transform: translateY(-10px);
		}
	}
}
</style>
