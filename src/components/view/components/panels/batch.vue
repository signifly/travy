<template>
	<vPanel v-bind="{loading: loadingAll}">
		<div class="left">
			<Tooltip content="Save and close">
				<a class="close" @click="closeSave"><i class="el-icon-circle-close-outline"></i></a>
			</Tooltip>
			<div class="text">{{title}}</div>
		</div>

		<div class="progress">
			<div class="line"><Progress :percentage="progress" :show-text="false" /></div>
			<div class="text">{{index + 1}} / {{items.length}}</div>
		</div>

		<div class="actions">
			<div class="error" v-if="error.message">{{error.message}}</div>

			<Button v-if="prev" size="medium" type="success" icon="el-icon-arrow-left" @click="prevSave">
				Save and back
			</Button>

			<Button
			v-if="next"
			size="medium"
			type="success"
			@click="nextSave"
			v-shortkey="{win: ['ctrl', 's'], mac: ['meta', 's']}"
			@shortkey.native="nextSave"
			title="CTRL/CMD + S">
				Save and next
				<i class="el-icon-arrow-right el-icon-right"></i>
			</Button>

			<Button v-if="!next" size="medium" type="success" @click="closeSave">
				Save and close
				<i class="el-icon-check el-icon-right"></i>
			</Button>
		</div>
	</vPanel>
</template>

<script>
import {Button, Tooltip, Progress} from "element-ui";
import vPanel from "@/components/panel.vue";

export default {
	components: {Button, Tooltip, Progress, vPanel},
	props: {
		title: {type: String, required: true},
		loading: {type: Boolean, required: true},
		seq: {type: Object, required: true},
		getData: {type: Function, required: true},
		error: {type: Object, required: true}
	},
	data() {
		return {
			loadingData: false
		}
	},
	computed: {
		modifiers: (t) => t.$route.query.modifiers,
		progress: (t) => ((t.index + 1) / t.items.length) * 100,
		items: (t) => t.seq.items.map(x => x.toString()),
		id: (t) => t.$route.params.viewId,
		index: (t) => t.items.indexOf(t.id),
		prev: (t) => t.items[t.index - 1],
		next: (t) => t.items[t.index + 1],

		loadingAll: (t) => t.loading || t.loadingData
	},
	methods: {
		nextSave() {
			this.$parent.$emit("save", {
				done: async () => {
					this.$router.push({
						params: {...this.$route.params, id: this.next},
						query: {modifiers: this.modifiers, seq: {items: this.items}}
					});
				}
			});
		},

		prevSave() {
			this.$parent.$emit("save", {
				done: async () => {
					this.$router.push({
						params: {...this.$route.params, id: this.prev},
						query: {modifiers: this.modifiers, seq: {items: this.items}}
					});
				}
			});
		},

		closeSave() {
			this.$parent.$emit("save", {
				done: async () => {
					this.$router.push({path: `/${this.$route.meta.id}`, query: {modifiers: this.modifiers}});
				}
			});
		},

		async _getData() {
			try {
				this.loadingData = true;
				await this.getData();
			} catch (err) {} finally {
				this.loadingData = false;
			}
		}
	},
	watch: {
		id() {
			this._getData();
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
