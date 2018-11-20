<template>
	<div class="line">
		<div class="icon drag">
			<i class="el-icon-rank"></i>
		</div>

		<div class="info">
			<div class="item">
				<div class="title">{{_titleKey}}:</div>
				<div class="text">{{titleValue}}</div>
			</div>

			<div class="item">
				<div class="title">{{_infoKey}}:</div>
				<div class="text">
					<vItemsTooltip :items="infoItems" :_itemKey="_infoItemKey" :_itemLink="_infoItemLink" />
				</div>
			</div>
		</div>

		<div class="select">
			<vSelectSearch
				:_options="_selectOptions"
				:_value="_selectValue"
				:value="selectValue"
				:_clearable="_selectClearable"
				size="small"
				@fieldA="fieldA"
			/>
		</div>

		<div class="toggle">
			<elSwitch v-model="data.switchValue" :inactive-text="`${_switchTitle}:`" :disabled="_switchDisabled" @change="switchUpdate"/>
		</div>

		<vActions v-bind="{_actions, alt}" @fieldA="fieldA"/>
	</div>
</template>

<script>
import {Switch} from "element-ui";
import vActions from "./actions.vue";
import {meta} from "@/modules/utils";
import vSelectSearch from "./input-select-search.vue";
import vItemsTooltip from "./items-tooltip.vue";

export default {
	components: {elSwitch: Switch, vActions, vSelectSearch, vItemsTooltip},
	meta: {
		res: {
			props: {
				titleKey: "Modal",
				titleValue: "titleValue",
				infoKey: "Variants",
				infoItems: "infoItems",
				infoItemKey: "name",
				infoItemLink: "/view/{id}",
				switchTitle: "switch",
				switchValue: "switchValue",
				switchDisabled: true,
				selectValue: "selectValue",
				selectClearable: false,
				selectOptions: {
					endpoint: meta.items,
					key: "",
					label: "name",
					value: "id"
				},
				actions: [
					{
						title: "Delete",
						props: {
							id: "popup",
							text: "delete this?",
							endpoint: {
								url: "url",
								method: "delete"
							}
						}
					}
				]
			},
			data: {
				titleValue: "a modal",
				switchValue: false,
				switchT: "title",
				selectValue: "",
				infoItems: [
					{name: "model #1", id: 1},
					{name: "model #2", id: 2}
				]
			}
		}
	},
	props: {
		alt: {type: Object, required: true},
		_titleKey: {type: String, required: true, doc: true},
		titleValue: {type: String, required: false, doc: true},
		_infoKey: {type: String, required: true, doc: true},
		infoItems: {type: Array, required: true, doc: true},
		_infoItemKey: {type: String, required: true, doc: true},
		_infoItemLink: {type: String, required: false, doc: true},
		_switchTitle: {type: String, required: true, doc: true},
		switchValue: {type: Boolean, required: false, doc: true},
		_switchDisabled: {type: Boolean, default: false, doc: true},
		selectValue: {type: [String, Number], required: false, doc: true},
		_selectClearable: {type: Boolean, required: false, doc: true},
		_selectOptions: {type: Object, required: true, doc: true},
		_actions: {type: Array, required: true, doc: true, note: `<a href="#vActions">vActions</a>`},
		_switchValue: {type: String, required: true},
		_selectValue: {type: String, required: true}
	},
	data() {
		return {
			data: {
				switchValue: this.switchValue
			}
		}
	},
	methods: {
		switchUpdate(val) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._switchValue]: val}
			});
		},

		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
}
</script>

<style lang="scss" scoped>
.line {
	background-color: $white2;
	border: 1px solid $blue3;
	border-radius: 4px;
	padding: 0 2em;
	display: flex;
	align-items: center;
	margin: 0.25em 0;
	height: em(100);

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25em;
		color: $blue4;
		cursor: grab;
		padding: 1em;
		margin-left: -1em;
		margin-right: 0.5em;
	}

	.info {
		margin-right: 1em;
		font-size: em(13);
		color: $blue4;

		.item {
			display: flex;
			margin: 0.6em 0;

			.title {
				font-weight: 600;
				min-width: 8em;
			}

			.text {

			}

			.tooltip {
				margin-left: 0.5em;
				font-size: 0.8em;
			}
		}
	}

	.toggle {
		transform: scale(0.95);
		margin-left: 2em;
	}

	.select {
		width: 10em;
		margin-left: auto;
	}

	.actions {
		width: 4.5em;
		text-align: right;

		a {
			text-decoration: none;
			color: $blue5;
		}
	}
}
</style>
