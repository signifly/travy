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
		res: {
			props: {
				value: "inputVal",
				options: {
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
				inputVal: ""
			}
		}
	},
	props: {
		alt: {type: Object, required: true},
		_disabled: {type: Boolean, required: false, doc: true},
		_options: {
			type: Object,
			required: true,
			doc: true,
			note: `if options is an array of objects, options.value is required`
		},
		value: {type: String, required: false, doc: true},
		_value: {type: String, required: true}
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

			cb(this.items); // keep showing old items while fetching new items

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
					update: {data: {[this._value]: value}}
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
