<template>
	<panel v-bind="{loading: loadingAll}" v-if="items.length">
		<div class="left">
			<Tooltip content="Save and close">
				<a class="close" @click="closeSave">
					<i class="el-icon-circle-close" />
				</a>
			</Tooltip>
			<div class="text" v-text="title" />
		</div>

		<div class="progress">
			<div class="line">
				<Progress :percentage="progress" :show-text="false" />
			</div>
			<div class="text">{{ index + 1 }} / {{ items.length }}</div>
		</div>

		<div class="actions">
			<div class="error" v-if="errorMsg" v-text="errorMsg" />

			<Button
				v-if="prev"
				size="medium"
				type="success"
				icon="el-icon-arrow-left"
				@click="prevSave"
			>
				{{ $translate({en: "Save and back", da: "Gem og gå tilbage"}) }}
			</Button>

			<Button
				v-if="next"
				size="medium"
				type="success"
				@click="nextSave"
				v-shortkey="{win: ['ctrl', 's'], mac: ['meta', 's']}"
				@shortkey.native="nextSave"
				title="CTRL/CMD + S"
			>
				{{ $translate({en: "Save and next", da: "Gem og gå videre"}) }}
				<i class="el-icon-arrow-right el-icon-right" />
			</Button>

			<Button v-if="!next" size="medium" type="success" @click="closeSave">
				{{ $translate({en: "Save and close", da: "Gem og luk"}) }}
				<i class="el-icon-check el-icon-right" />
			</Button>
		</div>
	</panel>
</template>

<script>
import {Button, Tooltip, Progress} from "element-ui";
import panel from "@/components/panel";
import {get} from "lodash";

export default {
	components: {Button, Tooltip, Progress, panel},
	props: {
		title: {type: String, required: true},
		errorMsg: {type: String, required: true},
		loading: {type: Boolean, required: true}
	},
	data() {
		return {
			sequential: JSON.parse(localStorage.getItem("sequential")),
			loadingData: false
		};
	},
	computed: {
		items: (t) => get(t.sequential, "items", []).map((x) => x.toString()),
		progress: (t) => ((t.index + 1) / t.items.length) * 100,
		loadingAll: (t) => t.loading || t.loadingData,
		modifiers: (t) => t.$route.query.modifiers,
		indexId: (t) => t.$route.params.indexId,
		viewId: (t) => t.$route.params.viewId,
		index: (t) => t.items.indexOf(t.viewId),
		prev: (t) => t.items[t.index - 1],
		next: (t) => t.items[t.index + 1]
	},
	methods: {
		nextSave() {
			this.$parent.$emit("save", {
				done: () => {
					this.$router.push({
						params: {...this.$route.params, viewId: this.next},
						query: {modifiers: this.modifiers, sequential: true}
					});
				}
			});
		},

		prevSave() {
			this.$parent.$emit("save", {
				done: () => {
					this.$router.push({
						params: {...this.$route.params, viewId: this.prev},
						query: {modifiers: this.modifiers, sequential: true}
					});
				}
			});
		},

		closeSave() {
			this.$emit("save", {
				done: () => {
					localStorage.removeItem("sequential");
					this.$router.push({
						path: `/i/${this.indexId}`,
						query: {modifiers: this.modifiers}
					});
				}
			});
		},

		refreshData() {
			this.loadingData = true;

			this.$emit("event", {
				done: () => (this.loadingData = false),
				actions: {refresh: true}
			});
		}
	},
	watch: {
		viewId() {
			this.refreshData();
		}
	}
};
</script>

<style lang="scss" scoped>
.left {
	display: flex;
	align-items: center;

	.close {
		color: $danger;
		padding: 0.5em;
		margin-top: 0.1em;
		margin-left: -0.5em;
		font-size: 1.1em;

		&.loading {
			color: $blue3;
			pointer-events: none;
		}
	}

	.text {
		margin-left: 0.5em;
		font-size: em(14);
		color: $blue4;
	}
}

.progress {
	display: flex;
	align-items: center;
	width: 30%;

	.line {
		width: 100%;
	}

	.text {
		font-size: 0.75em;
		white-space: nowrap;
		margin-left: 1em;
		letter-spacing: -1.25px;
	}
}

.actions {
	display: flex;
	align-items: center;

	.error {
		font-size: em(12);
		font-weight: 500;
		margin-right: 1em;
		color: $danger;
	}
}
</style>
