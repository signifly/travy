<template>
	<div class="search">
		<Input
			:placeholder="placeholder"
			:prefix-icon="icon"
			:class="{active}"
			@input="update"
			:value="value"
			size="medium"
			class="input"
			clearable
		/>
	</div>
</template>

<script>
import {Input} from "element-ui";
import {get} from "lodash";

export default {
	components: {Input},
	props: {
		placeholder: {type: String, required: false},
		loading: {type: Boolean, required: true},
		active: {type: Boolean, required: true},
		fields: {type: Array, required: false},
		state: {type: Object, required: true}
	},
	computed: {
		value: (t) => get(t.state.query, "filters.search", ""),
		icon: (t) => (t.loading ? "el-icon-loading" : "el-icon-search")
	},
	methods: {
		update(search) {
			this.$emit("event", {
				actions: {update: {data: {search}}}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search {
	margin-right: 0.5em;

	.input {
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
