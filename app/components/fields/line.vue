<template>
	<div class="line">
		<div class="icon">
			<i class="el-icon-rank"></i>
		</div>

		<div class="info">
			<div class="item" v-for="item in info">
				<div class="title">{{item.title}}:</div>
				<div class="text">{{item.value}}</div>
				<div class="tooltip" v-if="item.tooltip">
					<Tooltip :content="item.tooltip" placement="right">
						<i class="el-icon-info"></i>
					</Tooltip>
				</div>
			</div>
		</div>

		<div class="toggle">
			<elSwitch v-model="data.switchValue" :inactive-text="`${switchTitle}:`" @change="update" />
		</div>

		<actions :items="actions" @show="show" @remove="remove"/>
	</div>
</template>

<script>
import {Tooltip, Switch} from "element-ui";
import actions from "./actions/index.vue";

export default {
	components: {Tooltip, elSwitch: Switch, actions},
	props: {
		props: {type: Object, required: true},
		info: {type: Array, required: true},
		switchValue: {type: Boolean, required: true},
		switchTitle: {type: String, required: true},
		actions: {type: Array, required: true}
	},
	data() {
		return {
			data: {
				switchValue: this.switchValue
			}
		}
	},
	methods: {
		update(val) {
			this.$emit("update", {
				data: {[this.props.switchValue]: val}
			});
		},
		show() {
			this.$router.push({params: {tab: "basic"}});
		},
		remove({done}) {
			done();
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
