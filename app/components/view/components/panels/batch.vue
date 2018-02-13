<template>
	<vPanel>
		<div class="text">{{title}}</div>
		<div class="progress">
			<div class="line"><Progress :percentage="progress" :show-text="false" /></div>
			<div class="text">{{index + 1}} / {{items.length}}</div>
		</div>
		<div class="actions">
			<Button v-if="next" size="medium" type="success" v-bind="{loading}" @click="save">Save and next</Button>
			<Button v-else size="medium" type="success" icon="el-icon-check" v-bind="{loading}" @click="save">Save and exit</Button>
		</div>
	</vPanel>
</template>

<script>
import {Button, Progress} from "element-ui";
import vPanel from "@/components/panel.vue";

export default {
	components: {Button, Progress, vPanel},
	props: {
		title: {type: String, required: true},
		loading: {type: Boolean, required: true},
		seq: {type: Object, required: true},
		getData: {type: Function, required: true}
	},
	computed: {
		id: (t) => t.$route.params.id.toString(),
		index: (t) => t.items.indexOf(t.id),
		items: (t) => t.seq.items.map(x => x.toString()),
		next: (t) => t.items[t.index + 1],
		progress: (t) => ((t.index + 1) / t.items.length) * 100
	},
	methods: {
		save() {
			this.$parent.$emit("save", {
				done: async () => {
					if (this.next) {
						this.$router.push({
							params: {...this.$route.params, id: this.next},
							query: {seq: {items: this.items}}
						});

						await this.$nextTick(); // wait for id to change
						await this.getData();

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
