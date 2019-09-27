<template>
	<div class="input">
		<Autocomplete
			size="medium"
			:value="value"
			@input="update"
			:debounce="300"
			:disabled="_disabled"
			:fetch-suggestions="getData"
		/>
	</div>
</template>

<script>
import {Autocomplete} from "element-ui";
import {merge, get} from "lodash";

export default {
	components: {Autocomplete},
	meta: {
		spec: {
			value: {type: [String, Number], required: false},
			_disabled: {type: Boolean, required: false},
			_entities: {
				type: Object,
				required: true,
				children: {
					dataWrap: {type: String, required: false},
					value: {type: [String, Number], required: true},
					endpoint: {
						type: Object,
						required: true,
						children: {
							url: {type: String, required: true},
							params: {type: Object, required: false}
						}
					}
				}
			}
		},
		res: {
			props: {
				_disabled: false,
				value: "value",
				_entities: {
					endpoint: {
						url: "items"
					},
					value: "name"
				}
			},
			data: {
				value: "item1"
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false},
		_entities: {type: Object, required: true},
		value: {type: String, required: false}
	},
	methods: {
		async getData(search, cb) {
			const {
				value,
				dataWrap,
				endpoint: {url, params}
			} = this._entities;

			const {data} = await this.$axios.get(url, {
				params: merge({}, params, {
					filter: {search}
				})
			});

			const items = get(data, dataWrap, data).map((x) => ({
				value: get(x, value)
			}));

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
