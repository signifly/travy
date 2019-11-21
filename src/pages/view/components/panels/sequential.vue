<template>
	<panel v-bind="{loading}" v-if="items.length">
		<div class="left">
			<Tooltip content="Close">
				<a class="close" @click="close">
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

			<transition name="el-fade-in" mode="out-in">
				<Button
					v-if="edit"
					size="medium"
					type="primary"
					v-bind="{loading}"
					@click="save"
					v-shortkey="{win: ['ctrl', 's'], mac: ['meta', 's']}"
					@shortkey.native="save"
					title="CTRL/CMD + S"
				>
					{{ $translate({en: "Save changes", da: "Gem ændringer"}) }}
				</Button>

				<div v-else>
					<Button
						v-if="prevPath"
						size="medium"
						type="success"
						icon="el-icon-back"
						@click="prev"
					>
						{{ $translate({en: "Back", da: "Forrige"}) }}
					</Button>

					<Button
						v-if="nextPath"
						size="medium"
						type="success"
						@click="next"
						v-shortkey="{win: ['ctrl', 's'], mac: ['meta', 's']}"
						@shortkey.native="next"
						title="CTRL/CMD + S"
					>
						{{ $translate({en: "Next", da: "Næste"}) }}
						<i class="el-icon-arrow-right el-icon-right" />
					</Button>

					<Button
						v-if="!nextPath"
						size="medium"
						type="success"
						@click="close"
						v-shortkey="{win: ['ctrl', 's'], mac: ['meta', 's']}"
						@shortkey.native="close"
					>
						{{ $translate({en: "Close", da: "Luk"}) }}
						<i class="el-icon-check el-icon-right" />
					</Button>
				</div>
			</transition>
		</div>
	</panel>
</template>

<script>
import {Button, Tooltip, Progress} from "element-ui";
import panel from "@/components/panel";

export default {
	components: {Button, Tooltip, Progress, panel},
	props: {
		errorMsg: {type: String, required: true},
		loading: {type: Boolean, required: true},
		edit: {type: Boolean, required: true},
		title: {type: String, required: true}
	},
	data() {
		return {
			data: JSON.parse(localStorage.getItem("seq"))
		};
	},
	computed: {
		progress: (t) => ((t.index + 1) / t.items.length) * 100,
		index: (t) => t.items.indexOf(t.$route.path),
		modifiers: (t) => t.$route.query.modifiers,
		indexId: (t) => t.$route.params.indexId,
		viewId: (t) => t.$route.params.viewId,
		items: (t) => t.data.items,

		prevPath() {
			const {fullPath, path} = this.$route;
			const prev = this.items[this.index - 1];
			return prev && fullPath.replace(path, prev);
		},

		nextPath() {
			const {fullPath, path} = this.$route;
			const next = this.items[this.index + 1];
			return next && fullPath.replace(path, next);
		}
	},
	methods: {
		next() {
			this.$parent.$emit("save", {
				done: () => {
					this.$router.push({
						path: this.nextPath,
						query: {modifiers: this.modifiers, sequential: true}
					});
				}
			});
		},

		prev() {
			this.$parent.$emit("save", {
				done: () => {
					this.$router.push({
						path: this.prevPath,
						query: {modifiers: this.modifiers, sequential: true}
					});
				}
			});
		},

		save() {
			this.$emit("save");
		},

		close() {
			this.$emit("save", {
				done: () => {
					localStorage.removeItem("seq");
					this.$router.push({
						path: `/i/${this.indexId}`,
						query: {modifiers: this.modifiers}
					});
				}
			});
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
	align-items: center;
	margin-right: auto;
	margin-left: 29%;
	display: flex;
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
