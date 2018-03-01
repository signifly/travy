<template>
	<div class="line">
		<div class="icon">
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
					<vItemsTooltip :items="infoItems" :_itemKey="_infoItemKey" />
				</div>
			</div>
		</div>

		<div class="toggle">
			<elSwitch v-model="data.switchValue" :inactive-text="`${_switchTitle}:`" @change="switchUpdate"/>
		</div>

		<vActions :_items="_actions" @fieldA="$emit('fieldA', $event)"/>
	</div>
</template>

<script>
import {Switch} from "element-ui";
import vActions from "./actions/index.vue";
import vItemsTooltip from "./items-tooltip.vue";

export default {
	components: {elSwitch: Switch, vActions, vItemsTooltip},
	meta: {
		res: {
			props: {
				titleKey: "Modal",
				titleValue: "titleValue",
				infoKey: "Variants",
				infoItems: "infoItems",
				infoItemKey: "name",
				switchTitle: "switch",
				switchValue: "switchValue",
				actions: [
					{
						title: "Delete",
						type: "delete",
						description: "delete this?"
					},
					{
						title: "View",
						type: "show",
						endpoint: "doc"
					}
				]
			},
			data: {
				titleValue: "a modal",
				switchValue: false,
				switchT: "title",
				infoItems: [
					{
						name: "model #1"
					},
					{
						name: "model #2"
					}
				]
			}
		}
	},
	props: {
		_titleKey: {type: String, required: true, doc: true},
		titleValue: {type: String, required: true, doc: true},
		_infoKey: {type: String, required: true, doc: true},
		infoItems: {type: Array, required: true, doc: true},
		_infoItemKey: {type: String, required: true, doc: true},
		_switchTitle: {type: String, required: true, doc: true},
		switchValue: {type: Boolean, required: false, doc: true},
		_switchValue: {type: String, required: true},
		_actions: {type: Array, required: true, doc: true}
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
	cursor: grab;

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25em;
		margin-right: 1.5em;
		color: $blue4;
	}

	.info {
		font-size: em(13);
		color: $blue4;

		.item {
			display: flex;
			align-items: center;
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
		margin-left: auto;
	}

	.actions {
		width: 10em;
		text-align: right;
		font-size: em(12);
		a {
			text-decoration: none;
			color: $blue5;
		}
	}
}
</style>
