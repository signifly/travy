<template>
	<div class="input">
		<Autocomplete
			size="medium"
			:value="value"
			@input="update"
			:debounce="300"
			:disabled="_disabled"
			:fetch-suggestions="getOptions"
		/>
	</div>
</template>

<script>
import {Autocomplete} from "element-ui";
import {merge, get} from "lodash";

export default {
	components: {Autocomplete},
	meta: {
		spec: "props",
		res: {
			props: {
				_disabled: false,
				value: "inputVal",
				_options: {
					endpoint: {
						url: "items",
						params: {
							filter: {test: "test"},
							modifiers: {language_id: 1},
							sort: "value"
						}
					},
					value: "name",
					key: ""
				}
			},
			data: {
				inputVal: "item1"
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false},
		_options: {
			type: Object,
			required: true,
			note: `if options is an array of objects, options.value is required`
		},
		value: {type: String, required: false}
	},
	data() {
		return {
			items: []
		};
	},
	methods: {
		async getOptions(search, cb) {
			const {
				key,
				value,
				endpoint: {url, params}
			} = this._options;

			const {data} = await this.$axios.get(url, {
				params: merge({}, params, {
					filter: {search}
				})
			});

			const items = get(data, key, data).map((x) => {
				return typeof x === "string" ? {value: x} : {value: get(x, value)};
			});

			this.items = items;
			cb(items);
		},

		update(value) {
			this.$emit("event", {
				actions: {
					update: {data: {value}}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input {
	.el-autocomplete {
		width: 100%;
	}
}
</style>
