<template>
	<div class="select-download">
		<div class="title" v-text="title" />
		<div class="sub" v-text="subtitle" />

		<div class="download">
			<Select
				:remote-method="getData"
				@visible-change="open"
				:filterable="true"
				v-model="value"
				:remote="true"
				size="small"
			>
				<Option v-for="item in items" :key="item.value" v-bind="item" />
			</Select>

			<a class="button" target="_blank" :href="value" download>
				<Button :disabled="!value" type="primary" size="small">
					{{ $translate({en: "Download", da: "Hent"}) }}
				</Button>
			</a>
		</div>
	</div>
</template>

<script>
import {Select, Option, Button} from "element-ui";
import {merge, get} from "lodash";

export default {
	components: {Select, Option, Button},
	meta: {
		spec: {
			title: {type: String, required: true},
			subtitle: {type: String, required: true},
			entities: {
				type: Object,
				required: true,
				children: {
					dataWrap: {type: String, required: false},
					value: {type: String, required: true, note: "maps to an entity"},
					label: {type: String, required: true, note: "maps to an entity"},
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
				title: "Download",
				subtitle: "Subtitle",
				entities: {
					endpoint: {url: "items"},
					dataWrap: "data",
					value: "image",
					label: "name"
				}
			}
		}
	},
	props: {
		title: {type: String, required: true},
		subtitle: {type: String, required: true},
		entities: {type: Object, required: true}
	},
	data() {
		return {
			opened: false,
			value: "",
			data: []
		};
	},
	computed: {
		items: (t) =>
			t.data.map((x) => ({
				value: get(x, t.entities.value),
				label: get(x, t.entities.label)
			}))
	},
	methods: {
		open() {
			if (!this.opened) {
				this.opened = true;
				this.getData();
			}
		},

		async getData(search) {
			const {url, params} = this.entities.endpoint;
			const {dataWrap} = this.entities;

			const {data} = await this.$axios.get(url, {
				params: merge({}, params, {
					filter: {search}
				})
			});

			this.data = get(data, dataWrap, data);
		}
	}
};
</script>

<style lang="scss" scoped>
.select-download {
	border: 1px solid $blue2;
	background-color: #f5f7fa;

	padding: 1.5em;
	padding-top: 1.75em;

	.title {
		font-weight: 500;
		margin-bottom: 0.5em;
	}

	.sub {
		font-size: 13px;
		color: #8c9eb4;
	}

	.download {
		display: flex;
		align-items: center;
		margin-top: 2em;

		.button {
			margin-left: 0.5em;
		}

		.el-select {
			width: 100%;
		}
	}
}
</style>
