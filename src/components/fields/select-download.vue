<template>
	<div class="select-download">
		<div class="title" v-text="_title"/>
		<div class="sub" v-text="_subtitle"/>

		<div class="download">
			<Select
			size="small"
			v-model="value"
			:remote-method="getItems"
			:filterable="true"
			:remote="true"
			@visible-change="open">

				<Option v-for="item in itemsC" :key="item.value" v-bind="item"/>

			</Select>

			<a class="button" target="_blank" :href="selectedItem && selectedItem.download" download>
				<Button :disabled="!selectedItem" type="primary" size="small">Hent</Button>
			</a>
		</div>

	</div>
</template>

<script>
import {meta, rStringPropsDeep} from "@/modules/utils";
import {Select, Option, Button} from "element-ui";
import {merge, get} from "lodash";

export default {
	components: {Select, Option, Button},
	meta: {
		res: {
			props: {
				title: "Skatterapport",
				subtitle: "Beskrivelse af rapporten",

				options: {
					endpoint: {
						url: meta.items,
						params: {filter: {test: "test"}}
					},
					key: "",
					label: "name",
					value: "id",
					download: "image"
				}
			}
		}
	},
	props: {
		alt: {type: Object, required: false},
		_title: {type: String, required: true, doc: true},
		_subtitle: {type: String, required: true, doc: true},
		_options: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			opened: false,
			value: "",
			items: []
		}
	},
	computed: {
		endpoint: (t) => rStringPropsDeep({
			data: get(t.alt, "data"),
			obj: t._options.endpoint
		}),

		itemsC: (t) => t.items.map(x => ({
			value: get(x, t._options.value),
			label: get(x, t._options.label),
			download: get(x, t._options.download)
		})),

		selectedItem() {
			return this.itemsC.find(x => x.value === this.value);
		}
	},
	methods: {
		open() {
			if (!this.opened) {
				this.opened = true;
				this.getItems();
			}
		},

		async getItems(search) {
			const key = this._options.key;

			const {data} = await this.$axios.get(this.endpoint.url, {
				params: merge({}, this.endpoint.params, {
					filter: {search},
					count: 30
				})
			});

			this.items = key ? get(data, key) : data;
		}
	}
};
</script>

<style lang="scss" scoped>
.select-download {

	border: 1px solid $blue2;
	background-color: #F5F7FA;

	padding: 1.5em;
	padding-top: 1.75em;

	.title {
		font-weight: 500;
		margin-bottom: 0.5em;
	}

	.sub {
		font-size: 13px;
		color: #8C9EB4;
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
