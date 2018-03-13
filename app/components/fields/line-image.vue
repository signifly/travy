<template>
	<div class="line-image">
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
				<div class="text">{{infoValue}}</div>
			</div>
		</div>

		<vActions v-bind="{_actions, rootData}" @fieldA="fieldA"/>
	</div>
</template>

<script>
import vActions from "./actions.vue";

export default {
	components: {vActions},
	meta: {
		res: {
			props: {
				titleKey: "Modal",
				titleValue: "titleValue",
				infoKey: "Variants",
				infoValue: "infoValue",
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
				infoValue: "variants"
			}
		}
	},
	props: {
		rootData: {type: Object, required: true},
		_titleKey: {type: String, required: true, doc: true},
		titleValue: {type: String, required: false, doc: true},
		_infoKey: {type: String, required: true, doc: true},
		infoValue: {type: String, required: false, doc: true},
		_actions: {type: Array, required: true, doc: true, note: `
			if you need to map field props to fieldData you can do:<br>
			<code>
				props: {
					value: fieldsData.value
				}
			</code>
		`}
	},
	data() {
		return {
			data: {

			}
		}
	},
	methods: {
		// switchUpdate(val) {
		// 	this.$emit("fieldA", {
		// 		action: "update",
		// 		data: {[this._switchValue]: val}
		// 	});
		// },

		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
}
</script>

<style lang="scss" scoped>
.line-image {
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
		}
	}

	> .actions {
		width: 6em;
		text-align: right;
		font-size: em(12);
		margin-left: auto;

		a {
			text-decoration: none;
			color: $blue5;
		}
	}
}
</style>
