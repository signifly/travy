<template>
	<vPanel>
		<div class="text">{{title}}</div>
		<div class="progress">
			<div class="line"><Progress :percentage="progress" :show-text="false" /></div>
			<div class="text">{{index + 1}} / {{seq.length}}</div>
		</div>
		<div class="actions">
			<Button size="medium" type="success" v-bind="{loading}" @click="save">
				<template v-if="next">Save and next</template>
				<template v-else>Save and exit</template>
			</Button>
		</div>
	</vPanel>
</template>

<script>
import {Button, Progress} from "element-ui";
import vPanel from "@/components/panel.vue";

export default {
	components: {Button, Progress, vPanel},
	props: {
		id: {type: Number, required: true},
		title: {type: String, required: true},
		loading: {type: Boolean, required: true},
		seq: {type: Array, required: true}
	},
	computed: {
		index: (t) => t.seq.indexOf(t.id),
		next: (t) => t.seq[t.index + 1],
		progress: (t) => ((t.index + 1) / t.seq.length) * 100
	},
	methods: {
		save() {
			this.$parent.$emit("save", {
				done: () => {
					if (this.next) {
						this.$router.push({path: this.next.toString(), query: {seq: this.seq}});
					} else {
						this.$router.push("/" + this.$route.meta.parent.id);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.text {
	font-size: em(14);
	color: $blue4;
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
</style>
